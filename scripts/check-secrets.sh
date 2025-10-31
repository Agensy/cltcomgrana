#!/bin/bash

# Script para verificar secrets necessários no GitHub
# Como não podemos acessar os secrets diretamente, este script lista os necessários

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Verificação de Secrets Necessários para o Workflow${NC}"
echo "=================================================="
echo ""

echo -e "${YELLOW}📋 SECRETS OBRIGATÓRIOS PARA FTP DEPLOY:${NC}"
echo "   • FTP_SERVER - Servidor FTP da HostGator"
echo "   • FTP_USERNAME - Nome de usuário FTP"
echo "   • FTP_PASSWORD - Senha FTP"
echo ""

echo -e "${YELLOW}📋 SECRETS OPCIONAIS PARA ANALYTICS:${NC}"
echo "   • GA_MEASUREMENT_ID - Google Analytics 4 ID"
echo "   • META_PIXEL_ID - Meta Pixel ID"
echo "   • META_ACCESS_TOKEN - Meta Conversions API Token"
echo "   • META_TEST_EVENT_CODE - Meta Test Event Code"
echo ""

echo -e "${YELLOW}📋 SECRETS OPCIONAIS PARA VERIFICAÇÃO:${NC}"
echo "   • PRODUCTION_URL - URL do site em produção"
echo ""

echo -e "${GREEN}✅ COMO VERIFICAR NO GITHUB:${NC}"
echo "   1. Acesse: https://github.com/seu-usuario/seu-repo/settings/secrets/actions"
echo "   2. Verifique se os secrets FTP_* estão configurados"
echo "   3. Configure os secrets opcionais conforme necessário"
echo ""

echo -e "${BLUE}🔍 VERIFICANDO ARQUIVO DE WORKFLOW...${NC}"

WORKFLOW_FILE=".github/workflows/main.yml"
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo -e "${RED}❌ ERRO: Arquivo $WORKFLOW_FILE não encontrado!${NC}"
    exit 1
fi

# Extrair todos os secrets usados
echo -e "${YELLOW}📋 SECRETS ENCONTRADOS NO WORKFLOW:${NC}"
grep -o 'secrets\.[A-Z_]*' "$WORKFLOW_FILE" | sort | uniq | while read secret; do
    secret_name=$(echo "$secret" | sed 's/secrets\.//')
    echo "   • $secret_name"
done

echo ""
echo -e "${GREEN}🚀 Para testar o deploy, certifique-se de que pelo menos FTP_SERVER, FTP_USERNAME e FTP_PASSWORD estão configurados!${NC}"