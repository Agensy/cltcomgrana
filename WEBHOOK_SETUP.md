# Configuração do Webhook n8n

## Problema Identificado

O teste de conectividade está falhando com erro 404, indicando que o webhook não está configurado corretamente no n8n.

## URL Atual do Webhook

```
https://ideva-n8n.8rmhax.easypanel.host/webhook/709dc5c1-b125-4eec-924d-82765bcfed4e
```

## Passos para Configurar o Webhook no n8n

### 1. Acesse o n8n
- Acesse: `https://ideva-n8n.8rmhax.easypanel.host`
- Faça login na sua conta

### 2. Criar/Verificar o Workflow
1. Crie um novo workflow ou abra o workflow existente
2. Adicione um nó **Webhook** como trigger
3. Configure o webhook com as seguintes configurações:

#### Configurações do Webhook:
- **HTTP Method**: `POST`
- **Path**: `/webhook/709dc5c1-b125-4eec-924d-82765bcfed4e`
- **Authentication**: `None` (ou conforme sua necessidade)
- **Response Mode**: `Respond to Webhook`
- **Response Code**: `200`

### 3. Configurar o Processamento dos Dados
Adicione nós para processar os dados recebidos:

```json
{
  "nome": "string",
  "email": "string", 
  "telefone": "string",
  "empresa": "string",
  "cargo": "string",
  "interesse": "string",
  "origem": "string",
  "timestamp": "string"
}
```

### 4. Ativar o Workflow
- Certifique-se de que o workflow está **ATIVO**
- O status deve mostrar "Active" ou "Ativo"

### 5. Testar o Webhook
Execute este comando no terminal para testar:

```bash
curl -X POST "https://ideva-n8n.8rmhax.easypanel.host/webhook/709dc5c1-b125-4eec-924d-82765bcfed4e" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@exemplo.com",
    "telefone": "(11) 99999-9999",
    "empresa": "Empresa Teste",
    "cargo": "Desenvolvedor",
    "interesse": "Teste de conectividade",
    "origem": "Dashboard",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
  }'
```

### 6. Verificar Logs
- No n8n, verifique os logs de execução do workflow
- Confirme se as requisições estão sendo recebidas

## Possíveis Problemas e Soluções

### Erro 404 - Webhook não encontrado
- ✅ **Verificar se o workflow está ativo**
- ✅ **Confirmar se o path do webhook está correto**
- ✅ **Verificar se o nó webhook está configurado corretamente**

### Erro de CORS
- Adicionar headers CORS no nó de resposta do webhook
- Configurar `Access-Control-Allow-Origin: *`

### Timeout
- Verificar se o workflow não está travando
- Otimizar o processamento dos dados

## Configuração Alternativa

Se o webhook atual não funcionar, você pode:

1. **Criar um novo webhook** no n8n
2. **Copiar a nova URL** gerada
3. **Atualizar a URL** no arquivo `src/services/webhookService.ts`:

```typescript
private static readonly config: WebhookConfig = {
  url: 'SUA_NOVA_URL_AQUI',
  timeout: 10000
};
```

## Teste de Conectividade

Após configurar, teste no dashboard:
1. Acesse `/leads`
2. Clique em "Testar Webhook"
3. Verifique se a mensagem de sucesso aparece

## Suporte

Se o problema persistir:
1. Verifique os logs do n8n
2. Teste a URL diretamente no navegador
3. Confirme se o servidor n8n está funcionando