#!/bin/bash

# Script para instalar hooks de proteção do Git

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🔧 Instalando hooks de proteção do Git...${NC}"

# Configurar diretório de hooks personalizado
git config core.hooksPath .githooks

echo -e "${GREEN}✅ Hooks instalados com sucesso!${NC}"
echo ""
echo -e "${YELLOW}📋 Hooks ativos:${NC}"
echo "   • pre-commit: Valida configurações de deploy"
echo ""
echo -e "${GREEN}🛡️ Proteção ativada contra alterações problemáticas no deploy!${NC}"