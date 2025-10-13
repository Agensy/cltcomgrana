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
      console.log('📡 Enviando lead para webhook:', {
        leadId: lead.id,
        email: lead.email,
        timestamp: lead.timestamp,
        webhookUrl: this.config.url
      });

      // Verificação de conectividade básica
      console.log('🔍 Enviando dados para webhook...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
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
        
        if (response.status === 404) {
          console.error('❌ Webhook não encontrado (404):', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText,
            message: 'O endpoint do webhook não existe ou está mal configurado',
            possibleSolutions: [
              'Verifique se a URL do webhook está correta',
              'Confirme se o workflow n8n está ativo',
              'Verifique se o webhook trigger está configurado corretamente no n8n'
            ]
          });
        } else {
          console.error('❌ Erro na resposta do webhook:', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText
          });
        }
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao enviar lead para webhook:', {
        error: error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined,
        webhookUrl: this.config.url
      });

      // Diagnóstico adicional
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('🚨 DIAGNÓSTICO: Timeout na requisição!');
          console.error('📋 O webhook demorou mais que 10 segundos para responder');
        } else if (error.message.includes('Failed to fetch')) {
          console.error('🚨 DIAGNÓSTICO: Erro de conectividade detectado!');
          console.error('📋 Possíveis causas:');
          console.error('   1. Webhook está offline ou inacessível');
          console.error('   2. URL do webhook está incorreta');
          console.error('   3. Problemas de rede ou firewall');
          console.error('   4. Servidor do webhook está com problemas');
        }
      }

      return false;
    }
  }

  // Testa a conectividade com o webhook
  static async testConnectivity(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('🔍 Testando conectividade com webhook...');
      console.log('📡 URL de teste:', this.config.url);

      // Teste simples de conectividade
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
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