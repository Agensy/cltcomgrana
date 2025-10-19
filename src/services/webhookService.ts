import { LeadData } from './leadsService';

interface WebhookConfig {
  url: string;
  timeout: number;
}

class WebhookService {
  private static readonly config: WebhookConfig = {
    url: 'https://n8n.ideva.ai/webhook/lead-cltcomgrana',
    timeout: 10000 // 10 segundos
  };

  // Envia os dados do lead para o webhook
  static async sendLeadToWebhook(lead: LeadData): Promise<boolean> {
    try {
      const timestampBr = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'America/Sao_Paulo'
      }).format(new Date(lead.timestamp));

      const payload = { ...lead, timestampBr };

      console.log('📡 Enviando lead para webhook:', {
        leadId: lead.id,
        email: lead.email,
        timestamp_iso: lead.timestamp,
        timestamp_br: timestampBr,
        webhookUrl: this.config.url
      });

      console.log('🔍 Enviando dados para webhook (JSON POST)...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('📡 Resposta recebida do webhook:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        let result;
        try {
          result = await response.json();
        } catch {
          result = await response.text();
        }
        console.log('✅ Lead enviado com sucesso para webhook:', result);
        return true;
      } else {
        const errorText = await response.text();

        // Erros 404 geralmente indicam endpoint incorreto ou fluxo desligado; não adianta fallback
        if (response.status === 404) {
          console.error('❌ Webhook não encontrado (404):', {
            status: response.status,
            statusText: response.statusText,
            errorText,
            message: 'O endpoint do webhook não existe ou está mal configurado',
            possibleSolutions: [
              'Verifique se a URL do webhook está correta',
              'Confirme se o workflow n8n está ativo',
              'Verifique se o webhook trigger está configurado corretamente no n8n'
            ]
          });
          return false;
        }

        // Para outros códigos (ex: 5xx) tenta fallback para garantir entrega
        console.warn('⚠️ Erro HTTP ao enviar lead. Tentando fallback...', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        const fb = await this.fallbackSendLead(payload);
        return fb;
      }
    } catch (error) {
      console.error('❌ Erro ao enviar lead para webhook (JSON POST):', {
        error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
        webhookUrl: this.config.url
      });

      // Fallback para cenários de CORS/timeout/falha de rede
      const fb = await this.fallbackSendLead({ ...lead, timestampBr: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'America/Sao_Paulo' }).format(new Date(lead.timestamp)) });
      return fb;
    }
  }

  // Fallbacks para evitar bloqueios de CORS/preflight e garantir melhor entrega
  private static async fallbackSendLead(payload: any): Promise<boolean> {
    // 1) Tenta navigator.sendBeacon (não requer preflight, ideal para eventos de UI)
    try {
      console.log('🛟 Tentando fallback via sendBeacon...');
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const scheduled = navigator.sendBeacon(this.config.url, blob);
      if (scheduled) {
        console.log('✅ Fallback via sendBeacon agendado com sucesso');
        return true; // não há confirmação de entrega, mas o envio foi agendado
      } else {
        console.warn('⚠️ sendBeacon não conseguiu agendar o envio');
      }
    } catch (e) {
      console.warn('⚠️ sendBeacon não suportado ou falhou:', e);
    }

    // 2) Tenta fetch com no-cors e Content-Type simples (evita preflight)
    try {
      console.log('🛟 Tentando fallback via fetch no-cors (resposta opaca)...');
      await fetch(this.config.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          // Content-Type simples para evitar preflight
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      });
      console.log('✅ Fallback via fetch no-cors enviado (não é possível ler a resposta)');
      return true;
    } catch (e) {
      console.error('❌ Fallback via fetch no-cors falhou:', e);
    }

    // 3) Como último recurso, tenta GET com querystring (se o n8n aceitar GET)
    try {
      console.log('🛟 Tentando fallback via GET com querystring...');
      const qs = encodeURIComponent(JSON.stringify(payload));
      const url = `${this.config.url}?payload=${qs}`;
      await fetch(url, { method: 'GET', mode: 'no-cors' });
      console.log('✅ Fallback via GET enviado (resposta opaca)');
      return true;
    } catch (e) {
      console.error('❌ Fallback via GET falhou:', e);
    }

    console.error('❌ Todos os fallbacks falharam. Lead não enviado.');
    return false;
  }

  // Testa a conectividade com o webhook
  static async testConnectivity(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('🔍 Testando conectividade com webhook...');
      console.log('📡 URL de teste:', this.config.url);

      // Teste simples de conectividade
      const timestampBr = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'America/Sao_Paulo'
      }).format(new Date());

      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        timestampBr,
        message: 'Teste de conectividade do webhook'
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseDetails = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      };

      console.log('📡 Resposta do teste:', responseDetails);

      if (response.ok) {
        let result;
        try {
          result = await response.json();
        } catch {
          result = await response.text();
        }
        return {
          success: true,
          message: 'Conectividade OK! Webhook está funcionando.',
          details: { response: responseDetails, result }
        };
      } else {
        const errorText = await response.text();
        
        if (response.status === 404) {
          return {
            success: false,
            message: 'Webhook não encontrado (404): O endpoint não existe ou está mal configurado',
            details: { 
              response: responseDetails, 
              errorText,
              possibleSolutions: [
                'Verifique se a URL do webhook está correta',
                'Confirme se o workflow n8n está ativo',
                'Verifique se o webhook trigger está configurado corretamente no n8n',
                'Teste a URL diretamente no n8n para confirmar funcionamento'
              ]
            }
          };
        }
        
        return {
          success: false,
          message: `Erro HTTP ${response.status}: ${response.statusText}`,
          details: { response: responseDetails, errorText }
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          message: 'Timeout: Webhook demorou mais que 10 segundos para responder',
          details: {
            error: 'Timeout',
            timeout: this.config.timeout
          }
        };
      }

      if (errorMessage.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Erro de conectividade: Não foi possível acessar o webhook',
          details: {
            error: errorMessage,
            possibleCauses: [
              'Webhook está offline ou inacessível',
              'URL incorreta',
              'Problemas de rede ou firewall',
              'Servidor do webhook com problemas'
            ]
          }
        };
      }

      return {
        success: false,
        message: `Erro inesperado: ${errorMessage}`,
        details: { error: errorMessage }
      };
    }
  }

  // Envia múltiplos leads para o webhook
  static async sendMultipleLeadsToWebhook(leads: LeadData[]): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    console.log(`📊 Enviando ${leads.length} leads para webhook...`);

    for (const lead of leads) {
      const result = await this.sendLeadToWebhook(lead);
      if (result) {
        success++;
      } else {
        failed++;
      }
      
      // Pequena pausa entre requisições para não sobrecarregar o webhook
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`📊 Resultado do envio em lote: ${success} sucessos, ${failed} falhas`);
    return { success, failed };
  }

  // Retorna a URL do webhook configurada
  static getWebhookUrl(): string {
    return this.config.url;
  }

  // Retorna informações de configuração
  static getConfig(): WebhookConfig {
    return { ...this.config };
  }
}

export default WebhookService;