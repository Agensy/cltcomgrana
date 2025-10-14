// Google Sheets API Service para uso no browser
export interface GoogleSheetsLeadData {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  variation: string;
  popupType: string;
  pageName: string;
  pageUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  sessionId: string;
  leadId: string;
}

class GoogleSheetsService {
  private clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  private clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '';
  private redirectUri = window.location.origin + '/auth/callback';
  private scope = 'https://www.googleapis.com/auth/spreadsheets';
  
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage(): void {
    this.accessToken = localStorage.getItem('google_access_token');
    this.refreshToken = localStorage.getItem('google_refresh_token');
    const expiry = localStorage.getItem('google_token_expiry');
    this.tokenExpiry = expiry ? parseInt(expiry) : null;
  }

  private saveTokensToStorage(): void {
    if (this.accessToken) {
      localStorage.setItem('google_access_token', this.accessToken);
    }
    if (this.refreshToken) {
      localStorage.setItem('google_refresh_token', this.refreshToken);
    }
    if (this.tokenExpiry) {
      localStorage.setItem('google_token_expiry', this.tokenExpiry.toString());
    }
  }

  private clearTokensFromStorage(): void {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    localStorage.removeItem('google_token_expiry');
    localStorage.removeItem('google_spreadsheet_id');
    localStorage.removeItem('google_sheet_name');
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
  }

  // Inicia o fluxo de autenticação OAuth2
  async authenticate(): Promise<void> {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.clientId}&` +
      `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `scope=${encodeURIComponent(this.scope)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    // Abre uma nova janela para autenticação
    const authWindow = window.open(authUrl, 'google-auth', 'width=500,height=600');
    
    return new Promise((resolve, reject) => {
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed);
          reject(new Error('Autenticação cancelada pelo usuário'));
        }
      }, 1000);

      // Escuta por mensagens da janela de autenticação
      const messageListener = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          authWindow?.close();
          
          try {
            await this.exchangeCodeForTokens(event.data.code);
            resolve();
          } catch (error) {
            reject(error);
          }
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          authWindow?.close();
          reject(new Error(event.data.error));
        }
      };

      window.addEventListener('message', messageListener);
    });
  }

  // Troca o código de autorização por tokens
  private async exchangeCodeForTokens(code: string): Promise<void> {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao trocar código por tokens');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      this.saveTokensToStorage();
    } catch (error) {
      console.error('Erro ao trocar código por tokens:', error);
      throw error;
    }
  }

  // Renova o access token usando o refresh token
  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('Refresh token não disponível');
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: this.refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao renovar access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      this.saveTokensToStorage();
    } catch (error) {
      console.error('Erro ao renovar access token:', error);
      throw error;
    }
  }

  // Verifica se o token é válido e renova se necessário
  private async ensureValidToken(): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Usuário não autenticado');
    }

    // Se o token expira em menos de 5 minutos, renova
    if (this.tokenExpiry && this.tokenExpiry - Date.now() < 5 * 60 * 1000) {
      await this.refreshAccessToken();
    }
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.tokenExpiry && this.tokenExpiry > Date.now();
  }

  // Restaura a autenticação do localStorage
  async restoreAuth(): Promise<boolean> {
    this.loadTokensFromStorage();
    
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }

    // Se o token expirou, tenta renovar
    if (this.tokenExpiry <= Date.now()) {
      try {
        await this.refreshAccessToken();
        return true;
      } catch (error) {
        console.error('Erro ao restaurar autenticação:', error);
        this.clearTokensFromStorage();
        return false;
      }
    }

    return true;
  }

  // Configura a planilha e aba
  setSpreadsheetConfig(spreadsheetId: string, sheetName: string = 'Leads'): void {
    localStorage.setItem('google_spreadsheet_id', spreadsheetId);
    localStorage.setItem('google_sheet_name', sheetName);
  }

  // Obtém a configuração da planilha
  getSpreadsheetConfig(): { spreadsheetId: string | null; sheetName: string | null } {
    return {
      spreadsheetId: localStorage.getItem('google_spreadsheet_id'),
      sheetName: localStorage.getItem('google_sheet_name') || 'Leads'
    };
  }

  // Cria os cabeçalhos na planilha se não existirem
  async createHeaders(): Promise<void> {
    await this.ensureValidToken();
    
    const { spreadsheetId, sheetName } = this.getSpreadsheetConfig();
    if (!spreadsheetId || !sheetName) {
      throw new Error('Configuração da planilha não definida');
    }

    const headers = [
      'Timestamp', 'Nome', 'Email', 'Telefone', 'Projeto', 'Variação', 
      'Tipo Popup', 'Página', 'URL', 'UTM Source', 'UTM Medium', 
      'UTM Campaign', 'UTM Term', 'UTM Content', 'Session ID', 'Lead ID'
    ];

    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:P1`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [headers],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Falha ao criar cabeçalhos');
      }

      console.log('Cabeçalhos criados com sucesso');
    } catch (error) {
      console.error('Erro ao criar cabeçalhos:', error);
      throw error;
    }
  }

  // Adiciona um lead à planilha
  async addLead(leadData: GoogleSheetsLeadData): Promise<void> {
    await this.ensureValidToken();
    
    const { spreadsheetId, sheetName } = this.getSpreadsheetConfig();
    if (!spreadsheetId || !sheetName) {
      throw new Error('Configuração da planilha não definida');
    }

    const values = [
      leadData.timestamp,
      leadData.name,
      leadData.email,
      leadData.phone,
      leadData.project,
      leadData.variation,
      leadData.popupType,
      leadData.pageName,
      leadData.pageUrl,
      leadData.utmSource || '',
      leadData.utmMedium || '',
      leadData.utmCampaign || '',
      leadData.utmTerm || '',
      leadData.utmContent || '',
      leadData.sessionId,
      leadData.leadId,
    ];

    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:P:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [values],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Falha ao adicionar lead: ${errorData.error?.message || 'Erro desconhecido'}`);
      }

      console.log('Lead adicionado ao Google Sheets com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar lead ao Google Sheets:', error);
      throw error;
    }
  }

  // Testa a conexão com a planilha
  async testConnection(): Promise<boolean> {
    try {
      await this.ensureValidToken();
      
      const { spreadsheetId, sheetName } = this.getSpreadsheetConfig();
      if (!spreadsheetId || !sheetName) {
        throw new Error('Configuração da planilha não definida');
      }

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Falha ao acessar planilha');
      }

      // Verifica se a aba existe
      const data = await response.json();
      const sheetExists = data.sheets?.some((sheet: any) => sheet.properties.title === sheetName);
      
      if (!sheetExists) {
        throw new Error(`Aba "${sheetName}" não encontrada na planilha`);
      }

      return true;
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      throw error;
    }
  }

  // Desconecta o usuário
  disconnect(): void {
    this.clearTokensFromStorage();
  }
}

export const googleSheetsService = new GoogleSheetsService();