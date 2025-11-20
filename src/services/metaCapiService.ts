import LeadsService from '@/services/leadsService';

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => void;
    _fbq: unknown;
    __fbq_initialized_ids?: Set<string>;
  }
}

const parseBRLToNumber = (s: string): number => {
  if (!s) return 0;
  const cleaned = s.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
};

const normalizePhone = (phone: string): string => phone.replace(/\D+/g, '');

const sha256Hex = async (input: string): Promise<string> => {
  const enc = new TextEncoder();
  const data = enc.encode(input.trim().toLowerCase());
  const hash = await crypto.subtle.digest('SHA-256', data);
  const arr = Array.from(new Uint8Array(hash));
  return arr.map(b => b.toString(16).padStart(2, '0')).join('');
};

const getFbCookies = (): { fbp?: string; fbc?: string } => {
  try {
    const map: Record<string, string> = {};
    document.cookie.split(';').forEach(part => {
      const [k, v] = part.split('=');
      if (k && v) map[k.trim()] = decodeURIComponent(v.trim());
    });
    return { fbp: map['_fbp'], fbc: map['_fbc'] };
  } catch {
    return {};
  }
};

const generateEventId = (): string => {
  if (crypto && 'randomUUID' in crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

const getCheckoutLead = () => {
  let leadId: string | null = null;
  try {
    const raw = localStorage.getItem('checkoutData');
    if (raw) leadId = JSON.parse(raw)?.leadId || null;
  } catch { }
  const leads = LeadsService.getAllLeads();
  if (leadId) return leads.find(l => l.id === leadId) || null;
  return leads.length ? leads[leads.length - 1] : null;
};

export const sendMetaPurchase = async (): Promise<void> => {
  const lead = getCheckoutLead();
  const currency = 'BRL';
  const value = lead?.cashPrice ? parseBRLToNumber(lead.cashPrice) : 0;

  const eventId = generateEventId();

  // Disparo client-side com dedupe
  try {
    if (window.fbq) {
      window.fbq('track', 'Purchase', { value, currency }, { eventID: eventId });
    }
  } catch { }

  // Hash de PII no cliente (opcional)
  let emHashed: string | undefined;
  let phHashed: string | undefined;
  try {
    if (lead?.email) emHashed = await sha256Hex(lead.email);
    if (lead?.phone) phHashed = await sha256Hex(normalizePhone(lead.phone));
  } catch { }

  const { fbp, fbc } = getFbCookies();

  interface MetaCapiPayload {
    event_name: string;
    event_id: string;
    value: number;
    currency: string;
    action_source: string;
    event_source_url: string;
    fbp?: string;
    fbc?: string;
    user_data: {
      em?: string;
      ph?: string;
    };
    order_id?: string;
    contents: Array<{
      id: string;
      quantity: number;
      item_price: number;
    }>;
  }

  const payload: MetaCapiPayload = {
    event_name: 'Purchase',
    event_id: eventId,
    value,
    currency,
    action_source: 'website',
    event_source_url: window.location.href,
    fbp,
    fbc,
    user_data: {
      em: emHashed,
      ph: phHashed,
    },
    order_id: lead?.id,
    contents: [
      {
        id: lead?.variation || 'unknown',
        quantity: 1,
        item_price: value,
      },
    ],
  };

  const endpoint = '/capi/meta-events.php';

  try {
    if (import.meta.env.PROD) {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } else {
      console.debug('CAPI (dev) payload:', payload);
    }
  } catch (e) {
    console.warn('Falha ao enviar evento à Meta CAPI:', e);
  }
};