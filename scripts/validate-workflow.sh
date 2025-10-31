#!/bin/bash

# Script de Validação do Workflow de Deploy
# Previne alterações problemáticas no arquivo main.yml

set -e

WORKFLOW_FILE=".github/workflows/main.yml"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Validando configurações do workflow de deploy..."

# Verificar se o arquivo existe
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo -e "${RED}❌ ERRO: Arquivo $WORKFLOW_FILE não encontrado!${NC}"
    exit 1
fi

# Verificar server-dir (pegar apenas a linha de configuração, não a de validação)
SERVER_DIR=$(grep -A 10 "Deploy via FTP" "$WORKFLOW_FILE" | grep "server-dir:" | grep -v "grep" | sed 's/.*server-dir: *\([^ #]*\).*/\1/' | tr -d '"' | tr -d "'")

if [ "$SERVER_DIR" != "public_html/" ]; then
    echo -e "${RED}❌ ERRO CRÍTICO: server-dir está configurado como '$SERVER_DIR'${NC}"
    echo -e "${RED}   Isso causará problemas no deploy da HostGator!${NC}"
    echo ""
    echo -e "${YELLOW}📋 EXPLICAÇÃO DO PROBLEMA:${NC}"
    echo "   • HostGator requer server-dir: 'public_html/' para deploy correto"
    echo "   • server-dir: '/' fará upload para diretório raiz incorreto"
    echo "   • Isso torna o site inacessível na URL principal"
    echo ""
    echo -e "${GREEN}✅ SOLUÇÃO:${NC}"
    echo "   Altere server-dir para: public_html/"
    echo ""
    echo -e "${YELLOW}💡 COMANDO PARA CORRIGIR:${NC}"
    echo "   sed -i 's/server-dir:.*/server-dir: public_html\/  # ✅ CORRETO: HostGator requer public_html\//' $WORKFLOW_FILE"
    echo ""
    exit 1
fi

# Verificar se há exclusões problemáticas do .htaccess (somente chaves exclude/excludes)
if grep -Eq '^[[:space:]]*(exclude|excludes):.*\.htaccess' "$WORKFLOW_FILE"; then
    echo -e "${RED}❌ AVISO: .htaccess está sendo excluído do deploy!${NC}"
    echo -e "${YELLOW}   Isso pode quebrar o roteamento SPA do React.${NC}"
    echo ""
fi

# Verificar se dangerous-clean-slate está ativo
if grep -q "dangerous-clean-slate.*true" "$WORKFLOW_FILE"; then
    echo -e "${YELLOW}⚠️  AVISO: dangerous-clean-slate está ativo!${NC}"
    echo -e "${YELLOW}   Isso pode deletar arquivos importantes do servidor.${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Validação concluída com sucesso!${NC}"
echo -e "${GREEN}   server-dir está configurado corretamente: 'public_html/'${NC}"
echo ""
echo -e "${GREEN}🚀 Deploy seguro para prosseguir!${NC}"