## Objetivo
- Publicar os artefatos de produção (`dist/`) via FTP e garantir que a metatag de verificação do Facebook esteja presente na homepage para validar `cltcomgrana.com.br`.

## Passos de Deploy (FTP)
1) Build local (já pronto): `npm run build` gera `dist/` com a metatag em `<head>`.
2) Upload via FTP:
- Sincronizar o conteúdo de `dist/` para o docroot do site (ex.: `public_html/` ou `htdocs/`) do domínio `cltcomgrana.com.br`.
- Garantir que `index.html` esteja na raiz pública e acessível como homepage.
3) Regras de SPA (Apache/Nginx):
- Apache: adicionar/ajustar `.htaccess` com rewrite para SPA:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
- Nginx (server block):
```
location / {
  try_files $uri $uri/ /index.html;
}
```
4) Purga de cache/CDN: invalidar/limpar cache do provedor (Cloudflare/host) após o upload.

## Verificação da Metatag
- Checar HTML em produção:
  - `view-source:http://cltcomgrana.com.br/` e procurar `facebook-domain-verification`.
  - OU `curl -s -L http://cltcomgrana.com.br | grep -i facebook-domain-verification`.
- Sharing Debugger: recrawl `http://cltcomgrana.com.br/` e clicar em “Scrape Again”; depois “Verify domain”.

## Automação (GitHub)
- Configurar CI com `SamKirkland/FTP-Deploy-Action` para deploy automático do `dist/` em cada push para `main`:
```
name: Deploy via FTP
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci && npm run build
      - name: FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: dist
          server-dir: public_html
          dangerous-clean-slate: true
```
- Adicionar secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` no repositório.

## Entregáveis
- Deploy FTP concluído com `dist/` publicado.
- `index.html` online contendo `<meta name="facebook-domain-verification" content="p1x5fnbord6esimiytvryc7m3swxe8" />`.
- Verificação do domínio concluída no Meta Business Suite.

Se aprovar, executo o upload via FTP imediatamente e, em seguida, configuro o fluxo de deploy automático pelo GitHub Actions.