Objetivo
- Padronizar deploy para múltiplos domínios e projetos (LPs) via GitHub Actions + FTP, garantindo clareza de docroot, credenciais e caminhos.

Conceitos
- Docroot por subdomínio: cada subdomínio aponta para uma pasta específica (ex.: `public_html/lp1`).
- Usuário FTP dedicado: criar um usuário FTP por subdomínio com diretório inicial igual ao docroot.
- Server dir no deploy: usar `server-dir: ./` quando o usuário FTP inicia no docroot; usar caminho absoluto relativo (ex.: `public_html/lp1/`) quando o usuário FTP inicia na raiz da conta.

Nomeação de variáveis e segredos
- Segredos por alvo (ex.: LP1):
  - `LP1_FTP_SERVER`
  - `LP1_FTP_USERNAME`
  - `LP1_FTP_PASSWORD`
  - `LP1_GA_ID` (opcional)
  - `LP1_CLARITY_ID` (opcional)
- Variáveis por alvo (Repository Variables):
  - `LP1_REMOTE_DIR` (ex.: `./` ou `public_html/lp1/`)

Fluxo para criar novo alvo (ex.: LP2)
- cPanel: criar subdomínio e definir docroot claro (ex.: `public_html/lp2`).
- cPanel: criar usuário FTP com diretório inicial igual ao docroot.
- GitHub (Repository secrets/variables):
  - `LP2_FTP_SERVER`, `LP2_FTP_USERNAME`, `LP2_FTP_PASSWORD`
  - `LP2_GA_ID`, `LP2_CLARITY_ID` (se aplicável)
  - `LP2_REMOTE_DIR` (defina `./` se o usuário FTP inicia no docroot; caso contrário `public_html/lp2/`).
- Workflow: duplicar `deploy-lp1.yml` como `deploy-lp2.yml` e ajustar:
  - `name: Deploy LP2 ...`
  - filtros de paths incluindo `src/pages/**/LP2.tsx`, `src/config/variations.ts`, `public/.htaccess`.
  - `VITE_DEFAULT_HOME` para `b/lp2` (ou o caminho correspondente).
  - segredos `LP2_*` e `vars.LP2_REMOTE_DIR`.
  - commit override `[lp2]` na mensagem quando quiser forçar deploy sem mudanças capturadas.

Detalhes específicos LP2
- Workflow criado: `.github/workflows/deploy-lp2.yml`
- Build: inclui `public/.htaccess` em `dist/.htaccess`
- Secrets necessários:
  - `LP2_FTP_SERVER` (fallback para `FTP_SERVER` se ausente)
  - `LP2_FTP_USERNAME`
  - `LP2_FTP_PASSWORD`
  - Opcional: `LP2_GA_ID`, `LP2_CLARITY_ID` para popular `.env.production`
- Variáveis (Repository Variables):
  - `LP2_REMOTE_DIR` (ex.: `./` se o usuário FTP inicia em `public_html/lp2`; ou `public_html/lp2/` se o usuário inicia na raiz)
- Fallback de diretório:
  - Se `LP2_REMOTE_DIR` não estiver definido, o deploy envia para `./` e, em seguida, tenta `./lp2/`
- Acionamento:
  - Push no `main` com mudanças em paths filtrados ou mensagem contendo `[lp2]`
- Pós-deploy:
  - Garanta que `lp2.cltcomgrana.com.br` aponta para o docroot configurado em `LP2_REMOTE_DIR`

Pontos de checagem
- Após deploy, garantir que o docroot contém `index.html`, `.htaccess` e pastas estáticas.
- Permissões: diretórios `755`, arquivos `644`.
- HTTPS: só forçar redirect quando o certificado do subdomínio estiver válido.

Padrões de commit
- Use marcadores para overrides: `[lp1]`, `[lp2]`, `[site]` conforme o alvo.

Dúvidas comuns
- 403 pós-deploy: geralmente docroot errado, `.htaccess` ausente no docroot, ou redirect para HTTPS sem SSL válido.
- Estruturas duplicadas (ex.: `lp1/public_html/lp1`): defina um único docroot e alinhe `server-dir` e o diretório inicial do usuário FTP.