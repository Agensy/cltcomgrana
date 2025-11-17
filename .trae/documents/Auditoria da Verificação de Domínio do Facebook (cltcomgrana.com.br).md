## Objetivo
- Identificar por que a verificação do domínio via metatag (`facebook-domain-verification`) está falhando e orientar correções.

## Constatações (código local)
- A metatag está presente estaticamente dentro de `<head>` em `index.html` e persiste no build:
  - `index.html:11` → `<meta name="facebook-domain-verification" content="p1x5fnbord6esimiytvryc7m3swxe8" />`
  - `dist/index.html:11` → mesma metatag no artefato de produção.
- A home é SPA/React, mas a metatag está no HTML base, não inserida dinamicamente.

## Hipóteses de Falha
1) Deploy não atualizado: servidor em produção ainda serve um `index.html` sem a metatag (cache/CDN ou artefato antigo).
2) Redirecionamentos: o `cltcomgrana.com.br` redireciona para outro host/rota cujo HTML não contém a metatag.
3) Cache externo: Facebook/OG cache sem a metatag; precisa “recrawl”.
4) Proxy/otimização removendo metatag (minificadores agressivos, proxies, regras de segurança).

## Passos de Auditoria
1) Verificar o HTML em produção:
- Abrir `view-source:http://cltcomgrana.com.br/` e localizar a metatag.
- Via terminal: `curl -s -L http://cltcomgrana.com.br | grep -i facebook-domain-verification` e `curl -I -L http://cltcomgrana.com.br` para checar 30x/200.
2) Validar redirecionamentos:
- Confirmar se há 301/302 para `www.` ou subdomínios; garantir que o destino também contenha a metatag.
3) Purga de cache/CDN:
- Limpar cache no provedor (Cloudflare/Netlify/Vercel/Nginx), publicar novamente o `dist/` e invalidar CDN.
4) Re-scrape no Facebook:
- Usar o Sharing Debugger para `http://cltcomgrana.com.br/` e clicar em “Scrape Again/Recrawl”; em seguida clicar “Verify domain”.
5) Conferir policies do servidor:
- Confirmar que nenhum middleware retira metatags ou reescreve `<head>`.

## Correções Propostas
- Publicar imediatamente o `dist/` atual (contém a metatag correta) no host do `cltcomgrana.com.br`.
- Garantir que qualquer redirecionamento aponte para uma página cujo HTML contenha a metatag.
- Configurar uma invalidação de cache automática após deploy.
- Alternativa robusta: adicionar `DNS TXT` `facebook-domain-verification=p1x5fnbord6esimiytvryc7m3swxe8` no DNS do domínio (verifica sem depender de HTML).

## Entregáveis
- Verificar e reportar: status de redirecionamentos, presença da metatag no HTML online, resultado do “Scrape Again” e verificação final.
- Caso solicitado: aplicar deploy dos artefatos de `dist/` e orientar configuração de DNS TXT.

Confirma que publico o `dist/` no seu servidor e adiciono o TXT no DNS se necessário?