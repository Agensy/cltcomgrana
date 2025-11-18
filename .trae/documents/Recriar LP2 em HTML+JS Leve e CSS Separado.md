## Objetivo
- Recriar a página LP2 como documento estático `HTML + JavaScript` (JS incorporado ao HTML) e `CSS` externo minimalista, removendo dependências de React/Tailwind para reduzir tamanho e melhorar carregamento.

## Escopo da LP2
- Seções: Hero, Story, Solution (concise), Testimonials (mobile prints), How It Works, Final Offer (LP2), Benefits, For Who, FAQ (colapsável), Guarantee, WhatsApp Button, Footer.
- Funcionalidades essenciais:
  - Botão de CTA do checkout com merge de UTM da URL.
  - Cálculo/formatos de preço (parcelas, à vista, economia, por dia) conforme LP2.
  - Acordeão da FAQ e pequenas animações via CSS/JS nativo (IntersectionObserver).

## Entregáveis
- `lp2.html`: arquivo único com estrutura semântica, metatags (title/description/OG), JS inline no final do documento.
- `lp2.css`: stylesheet único com design tokens (CSS variables), layout responsivo e estilos das seções.
- Assets: uso dos arquivos já existentes em `dist/assets/images` quando possível; fallback para imagens essenciais.

## Conteúdo Dinâmico (Config embutida)
- Embed de configuração LP2:
  - Preços (original: `R$ 499`, parcelado: `R$ 9,45` x `12`, à vista: `R$ 97`), desconto: `85%`, bônus: `R$ 1.802`.
  - Checkout: `https://pay.hotmart.com/K102191894H?checkoutMode=10` + UTMs da URL.
- JS nativo pequeno para:
  - Formatação BRL.
  - Cálculos do per-day (opcional), economia e exibição dos valores.
  - Merge de UTMs no link de checkout.

## Performance
- CSS externo único, sem frameworks; layout com Flex/Grid.
- JS inline pequeno (no fim do body, `defer`/`DOMContentLoaded`).
- Preconnect/dns-prefetch somente para domínios necessários (checkout/CDN de imagens).
- Fontes: preferir sistema; carregar webfonts somente se indispensáveis, de forma não-blocking.
- Imagens otimizadas e `loading="lazy"`.

## Tracking (Opcional)
- Clarity/Facebook Pixel: incluir blocos comentados para fácil ativação; por padrão manter desativado para leveza.
- GTM: opcional com snippet assíncrono, fora do caminho crítico.

## Acessibilidade/SEO
- Semântica (`<header>`, `<main>`, `<section>`, `<footer>`), `aria-*` nos componentes interativos.
- Metatags essenciais e `canonical` se necessário.

## Publicação
- Entregar `lp2.html` e `lp2.css` prontos para subir via FTP no docroot (ex.: `public_html/lp2.html`).
- Opcional: ajustar rewrite para servir `lp2.html` como homepage do subdomínio `lp2`.

## Validação
- Testar peso total (HTML+CSS+JS) e LCP com rede simulada.
- Validar CTA/UTM, FAQ, responsividade e renderização de imagens.

Se aprovar, implemento `lp2.html` e `lp2.css` imediatamente e preparo os assets, mantendo o conteúdo da LP2 atual.