export interface LeadData {
  // Informações do Lead
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  
  // Informações da Página
  pageUrl: string;
  pageName: string;
  project: 'A' | 'B';
  variation: string;
  
  // Informações de Preço
  originalPrice: string;
  installmentPrice: string;
  installmentCount: number;
  cashPrice: string;
  discountPercentage: string;
  bonusValue: string;
  
  // Informações de UTM
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  
  // Informações do Popup
  popupType: 'checkout' | 'exit-intent' | 'time-based' | 'scroll-based';
  popupTrigger: string;
  
  // Informações de Sessão
  sessionId: string;
  userAgent: string;
  referrer: string;
  
  // Status do Lead
  status: 'captured' | 'converted' | 'abandoned';
  conversionValue?: number;
}

export interface LeadSummary {
  totalLeads: number;
  leadsByProject: {
    A: number;
    B: number;
  };
  leadsByVariation: Record<string, number>;
  leadsByPopupType: Record<string, number>;
  conversionRate: number;
  totalRevenue: number;
}

class LeadsService {
  private static readonly STORAGE_KEY = 'cltcomgrana_leads';
  private static readonly SESSION_KEY = 'cltcomgrana_session';

  // Gera um ID único para o lead
  private static generateLeadId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Gera ou recupera o ID da sessão
  private static getSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  // Extrai parâmetros UTM da URL
  private static getUtmParams(): Partial<LeadData> {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
      utmContent: urlParams.get('utm_content') || undefined,
      utmTerm: urlParams.get('utm_term') || undefined,
    };
  }

  // Captura um novo lead
  static captureLead(data: {
    name: string;
    email: string;
    phone: string;
    project: 'A' | 'B';
    variation: string;
    originalPrice: string;
    installmentPrice: string;
    installmentCount: number;
    cashPrice: string;
    discountPercentage: string;
    bonusValue: string;
    popupType: LeadData['popupType'];
    popupTrigger: string;
  }): LeadData {
    const lead: LeadData = {
      id: this.generateLeadId(),
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      
      pageUrl: window.location.href,
      pageName: this.getPageName(),
      project: data.project,
      variation: data.variation,
      
      originalPrice: data.originalPrice,
      installmentPrice: data.installmentPrice,
      installmentCount: data.installmentCount,
      cashPrice: data.cashPrice,
      discountPercentage: data.discountPercentage,
      bonusValue: data.bonusValue,
      
      ...this.getUtmParams(),
      
      popupType: data.popupType,
      popupTrigger: data.popupTrigger,
      
      sessionId: this.getSessionId(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      
      status: 'captured'
    };

    this.saveLead(lead);
    return lead;
  }

  // Salva o lead no localStorage
  private static saveLead(lead: LeadData): void {
    const leads = this.getAllLeads();
    leads.push(lead);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
  }

  // Recupera todos os leads
  static getAllLeads(): LeadData[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Atualiza o status de um lead
  static updateLeadStatus(leadId: string, status: LeadData['status'], conversionValue?: number): void {
    const leads = this.getAllLeads();
    const leadIndex = leads.findIndex(lead => lead.id === leadId);
    
    if (leadIndex !== -1) {
      leads[leadIndex].status = status;
      if (conversionValue) {
        leads[leadIndex].conversionValue = conversionValue;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
    }
  }

  // Gera resumo dos leads
  static getLeadsSummary(): LeadSummary {
    const leads = this.getAllLeads();
    
    const summary: LeadSummary = {
      totalLeads: leads.length,
      leadsByProject: {
        A: leads.filter(lead => lead.project === 'A').length,
        B: leads.filter(lead => lead.project === 'B').length,
      },
      leadsByVariation: {},
      leadsByPopupType: {},
      conversionRate: 0,
      totalRevenue: 0
    };

    // Agrupa por variação
    leads.forEach(lead => {
      summary.leadsByVariation[lead.variation] = (summary.leadsByVariation[lead.variation] || 0) + 1;
      summary.leadsByPopupType[lead.popupType] = (summary.leadsByPopupType[lead.popupType] || 0) + 1;
    });

    // Calcula taxa de conversão e receita
    const convertedLeads = leads.filter(lead => lead.status === 'converted');
    summary.conversionRate = leads.length > 0 ? (convertedLeads.length / leads.length) * 100 : 0;
    summary.totalRevenue = convertedLeads.reduce((total, lead) => total + (lead.conversionValue || 0), 0);

    return summary;
  }

  // Exporta leads para CSV
  static exportToCSV(): string {
    const leads = this.getAllLeads();
    const headers = [
      'ID', 'Timestamp', 'Nome', 'Email', 'Telefone',
      'URL da Página', 'Nome da Página', 'Projeto', 'Variação',
      'Preço Original', 'Preço Parcelado', 'Parcelas', 'Preço à Vista', 'Desconto', 'Bônus',
      'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content', 'UTM Term',
      'Tipo de Popup', 'Trigger do Popup',
      'Session ID', 'User Agent', 'Referrer',
      'Status', 'Valor de Conversão'
    ];

    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id,
        lead.timestamp,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.pageUrl}"`,
        `"${lead.pageName}"`,
        lead.project,
        lead.variation,
        lead.originalPrice,
        lead.installmentPrice,
        lead.installmentCount,
        lead.cashPrice,
        lead.discountPercentage,
        lead.bonusValue,
        lead.utmSource || '',
        lead.utmMedium || '',
        lead.utmCampaign || '',
        lead.utmContent || '',
        lead.utmTerm || '',
        lead.popupType,
        `"${lead.popupTrigger}"`,
        lead.sessionId,
        `"${lead.userAgent}"`,
        `"${lead.referrer}"`,
        lead.status,
        lead.conversionValue || ''
      ].join(','))
    ].join('\n');

    return csvContent;
  }

  // Obtém o nome da página atual
  private static getPageName(): string {
    const path = window.location.pathname;
    
    if (path === '/') return 'Home';
    if (path.includes('/a/lp1')) return 'Projeto A - LP1';
    if (path.includes('/a/lp2')) return 'Projeto A - LP2';
    if (path.includes('/a/lp3')) return 'Projeto A - LP3';
    if (path.includes('/a/obrigado')) return 'Projeto A - Obrigado';
    if (path.includes('/b/lp1')) return 'Projeto B - LP1';
    if (path.includes('/b/lp2')) return 'Projeto B - LP2';
    if (path.includes('/b/lp3')) return 'Projeto B - LP3';
    if (path.includes('/b/obrigado')) return 'Projeto B - Obrigado';
    
    return path;
  }

  // Limpa todos os leads (para desenvolvimento)
  static clearAllLeads(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default LeadsService;