#!/bin/bash

# Checklist de Pré-Deploy/Pré-Commit para Vite/React + HostGator (Apache/cPanel)
# Bloqueia commit se requisitos críticos não forem atendidos

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📋 Executando checklist de pré-deploy...${NC}"

# 1) Verificar .htaccess no public
if [ ! -f "public/.htaccess" ]; then
  echo -e "${RED}❌ FALHA: public/.htaccess não encontrado.${NC}"
  echo -e "${YELLOW}   Necessário para roteamento SPA no Apache (cPanel).${NC}"
  exit 1
fi

# 2) Build do projeto (garantir que compila)
echo -e "${YELLOW}🛠️  Rodando build (npm run build)...${NC}"
npm run build > /dev/null 2>&1 || {
  echo -e "${RED}❌ FALHA: build não concluiu com sucesso.${NC}"
  exit 1
}

# 3) Verificar index.html gerado e assets hashados
if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}❌ FALHA: dist/index.html não foi gerado.${NC}"
  exit 1
fi

# Não deve referenciar /src/main.tsx em produção
if grep -q "/src/main.tsx" dist/index.html; then
  echo -e "${RED}❌ FALHA: dist/index.html referencia /src/main.tsx (apenas DEV).${NC}"
  echo -e "${YELLOW}   Verifique o index.html raiz (DEV) e não altere scripts de produção manualmente.${NC}"
  exit 1
fi

# Deve ter scripts apontando para assets/js com hash
if ! grep -q "assets/js/" dist/index.html; then
  echo -e "${RED}❌ FALHA: dist/index.html não referencia bundles em assets/js/.${NC}"
  echo -e "${YELLOW}   O Vite precisa injetar arquivos com hash (cache busting).${NC}"
  exit 1
fi

# 4) .htaccess deve ser copiado para dist (Vite copia public/ por padrão)
if [ ! -f "dist/.htaccess" ]; then
  echo -e "${RED}❌ FALHA: dist/.htaccess não encontrado.${NC}"
  echo -e "${YELLOW}   Verifique se public/.htaccess existe e não está sendo ignorado.${NC}"
  exit 1
fi

# 5) Vite config não deve injetar script fixo (plugin antigo)
if grep -q "ensure-main-script" vite.config.ts; then
  echo -e "${RED}❌ FALHA: vite.config.ts contém plugin de injeção fixa (ensure-main-script).${NC}"
  echo -e "${YELLOW}   Remova o plugin para evitar bundle quebrado em produção.${NC}"
  exit 1
fi

# 6) Base path (apenas aviso)
if grep -q "base:" vite.config.ts; then
  if grep -q "base: '/'" vite.config.ts || grep -q 'base: "/"' vite.config.ts; then
    echo -e "${GREEN}✅ base configurado para raiz '/'.${NC}"
  else
    echo -e "${YELLOW}⚠️  AVISO: vite.config.ts possui base customizado.${NC}"
    echo -e "${YELLOW}   Certifique-se que o site está em subpasta correspondente e rebuild.${NC}"
  fi
fi

# 7) Validar workflow de deploy (server-dir e .htaccess)
if [ -f "scripts/validate-workflow.sh" ]; then
  ./scripts/validate-workflow.sh || {
    echo -e "${RED}❌ FALHA: validação do workflow indicou problemas críticos.${NC}"
    exit 1
  }
fi

echo -e "${GREEN}✅ Checklist de pré-deploy concluído com sucesso.${NC}"
exit 0