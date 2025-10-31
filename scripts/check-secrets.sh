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

echo -e "${BLUE}ℹ️  NOTA: Secrets opcionais de analytics foram removidos do workflow${NC}"
echo "   para manter apenas as configurações essenciais para deploy."
echo ""

echo -e "${GREEN}✅ COMO VERIFICAR NO GITHUB:${NC}"
echo "   1. Acesse: https://github.com/seu-usuario/seu-repo/settings/secrets/actions"
echo "   2. Verifique se os secrets FTP_* estão configurados"
echo "   3. Configure os secrets opcionais conforme necessário"
echo ""

echo "🔍 SECRETS ENCONTRADOS NO WORKFLOW:"
echo "===================================="

# Extrair secrets do arquivo main.yml
WORKFLOW_FILE=".github/workflows/main.yml"

if [ -f "$WORKFLOW_FILE" ]; then
    echo ""
    echo "📄 Analisando $WORKFLOW_FILE..."
    
    # Buscar por padrões de secrets
    SECRETS_FOUND=$(grep -o '\${{ secrets\.[A-Z_]* }}' "$WORKFLOW_FILE" | sort -u)
    
    if [ -n "$SECRETS_FOUND" ]; then
        echo ""
        echo "✅ Secrets encontrados:"
        echo "$SECRETS_FOUND" | while read -r secret; do
            # Extrair apenas o nome do secret
            SECRET_NAME=$(echo "$secret" | sed 's/\${{ secrets\.\([A-Z_]*\) }}/\1/')
            echo "   • $SECRET_NAME"
        done
        
        echo ""
        echo "📊 Total de secrets únicos: $(echo "$SECRETS_FOUND" | wc -l | tr -d ' ')"
        
        # Verificar se todos os secrets obrigatórios estão presentes
        echo ""
        echo "🔍 Verificando secrets obrigatórios:"
        REQUIRED_SECRETS=("FTP_SERVER" "FTP_USERNAME" "FTP_PASSWORD")
        
        for secret in "${REQUIRED_SECRETS[@]}"; do
            if echo "$SECRETS_FOUND" | grep -q "secrets\.$secret"; then
                echo "   ✅ $secret - encontrado"
            else
                echo "   ❌ $secret - AUSENTE"
            fi
        done
    else
        echo "❌ Nenhum secret encontrado no workflow"
    fi
else
    echo "❌ Arquivo $WORKFLOW_FILE não encontrado"
fi

echo ""
echo "✅ Verificação concluída!"
echo "   Certifique-se de que todos os secrets obrigatórios estão configurados"
echo "   no GitHub: Settings → Secrets and variables → Actions"