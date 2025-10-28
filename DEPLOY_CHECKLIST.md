# ✅ Checklist de Pré-Commit e Pré-Deploy (Vite/React + HostGator/cPanel)

Este guia documenta tudo que deve ser verificado antes de commitar ou fazer deploy. Está automatizado via script `scripts/pre-deploy-check.sh` e hook `pre-commit`.

## Objetivo
- Garantir que o bundle do Vite carrega corretamente em produção (cPanel/Apache)
- Garantir que o `.htaccess` do SPA está presente e funcional
- Evitar regressões como script fixo, base incorreta ou exclusão do `.htaccess`

## Como funciona no cPanel
- `public_html` é o DocumentRoot do Apache no HostGator
- Subimos o conteúdo de `dist/` (gerado por `npm run build`) para `public_html/`
- O `.htaccess` do `public/` é copiado para `dist/.htaccess` e garante roteamento SPA:
  - 404s são evitados redirecionando rotas não-arquivo para `index.html`
- Assets gerados pelo Vite têm hash (cache busting) e são referenciados em `dist/index.html`

## Checklist de Pré-Commit (automatizado)
Executado pelo hook se arquivos críticos mudarem (`src/`, `vite.config.ts`, `index.html`, `public/`, workflow):

1. Build compila (`npm run build`)
2. `dist/index.html` não referencia `/src/main.tsx`
3. `dist/index.html` referencia `assets/js/...` com hash
4. `dist/.htaccess` existe
5. `vite.config.ts` não contém plugin de injeção fixa (`ensure-main-script`)
6. `base` (se presente) é compatível com raiz ou subpasta (apenas aviso)
7. Workflow valida `server-dir: /` e não exclui `.htaccess`

## Checklist de Pré-Deploy (CI)
- `server-dir: /` no step de FTP
- `local-dir: dist/` (ou `out/` em Next.js)
- `.htaccess` não é excluído no deploy
- Build do CI passa sem erros
 - (GA4) Gera `.env.production` com `VITE_GA_MEASUREMENT_ID` a partir de `Secrets`

## Como rodar manualmente
```bash
# Instalar hooks (uma vez)
./scripts/install-hooks.sh

# Rodar checklist local a qualquer momento
./scripts/pre-deploy-check.sh
```

## n8n Webhook (CORS)
- Configure headers na resposta do webhook no n8n, se necessário:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Headers: Content-Type`
  - `Access-Control-Allow-Methods: POST, OPTIONS`
- Teste via `curl` conforme `WEBHOOK_SETUP.md`

## Problemas comuns
- Subir projeto inteiro em vez de `dist/`
- `.htaccess` ausente (apagado no FTP)
- `index.html` de DEV publicado (referência a `/src/main.tsx`)
- Plugin customizado injetando script fixo (quebra bundle)
- `base` incorreto para subpasta (assets quebram)

## Referências
- `DEPLOY_PROTECTION.md` — Regras críticas do workflow
- `WEBHOOK_SETUP.md` — Setup do webhook n8n
- `.github/workflows/main.yml` — Deploy via FTP