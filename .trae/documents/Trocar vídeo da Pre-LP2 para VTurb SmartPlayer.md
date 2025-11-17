## Objetivo
- Substituir o player atual (Panda/HLS em `<video>`) por o VTurb SmartPlayer indicado na Pre-LP2, mantendo o layout, os timers de CTA/disclaimer e a navegação após o término.

## Impacto
- Afeta somente `src/pages/ProjectB/PreLP2.tsx`. Opcionalmente, podemos adicionar preloads/dns-prefetch em `index.html` para melhor performance.

## Mudanças Propostas
### 1) Carregamento do SmartPlayer
- Inserir o custom element `<vturb-smartplayer id="vid-6919b9c4f65a4dcdb5b21eaa" style="display:block;margin:0 auto;width:100%" />` no lugar do `<video>`.
- Em `useEffect`, injetar scripts:
  - WebComponent runtime: `https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js` (uma única vez, com `id="vturb-smartplayer-js"`).
  - Script do player específico: `https://scripts.converteai.net/a9fb935f-36e0-4753-9a43-7758a0aa0378/players/6919b9c4f65a4dcdb5b21eaa/v4/player.js`.
- Adicionar o micro-otimizador `_plt` antes do carregamento do player para marcar time origin (conforme snippet).

### 2) Preloads e DNS Prefetch (Performance)
- Adicionar dinamicamente (ou em `index.html`) os hints:
  - `link rel="preload" as="script"` para o `player.js` e `smartplayer.js`.
  - `link rel="preload" as="fetch"` para `https://cdn.converteai.net/a9fb935f-36e0-4753-9a43-7758a0aa0378/6919b9b7b788ee53b44922e7/main.m3u8`.
  - `link rel="dns-prefetch"` para `https://cdn.converteai.net`, `https://scripts.converteai.net`, `https://images.converteai.net`, `https://api.vturb.com.br`.
- Remover o `preconnect` atual do PandaVideo em PreLP2.

### 3) Timers e Eventos
- O código atual inicia timers (`CTA` após ~60s, `disclaimer` após ~38s) no primeiro `play` do `<video>`.
- Com VTurb, usaremos dois caminhos:
  - Preferido: iniciar timers após o `player.js` carregar e o custom element estar presente (`document.getElementById('vid-...')`). Se o WebComponent expor evento de início (ex.: `play` no elemento), ouvir e iniciar timers.
  - Fallback robusto: iniciar timers na primeira interação do usuário (`click`/`touchstart`) e/ou após o `player.js` carregar (para evitar travar o fluxo se o evento não estiver disponível).
- Manter a barra de progresso simulada e a lógica de mostrar/ocultar `disclaimer` e `CTA`.

### 4) Navegação pós-vídeo
- O código atual navega para `/b/lp2` no `ended` do `<video>`. Com VTurb, se não houver evento nativo acessível, manter fallback de navegação quando `CTA` for clicada e opcionalmente um timeout extra para redirecionar ao fim (ex.: `setTimeout` baseado na duração estimada ou triggers do player, se disponíveis).

### 5) Segurança/Resiliência
- Evitar múltiplas injeções: checar existência por `id` antes de adicionar scripts/links.
- Cleanup: remover links/scritps adicionados no unmount quando apropriado.
- Não tocar em `ConditionalScripts`; o SmartPlayer é específico da página e não deve ser bloqueado.

## Verificação
- Rodar em dev (`vite`) e abrir `/b/pre-lp2`.
- Confirmar:
  - Player carrega e inicia corretamente.
  - `disclaimer` aparece ~38s após início;
  - `CTA` aparece ~60s;
  - Clique no `CTA` navega para `/b/lp2` mantendo querystring;
  - Performance hints visíveis no `<head>`.

## Arquivos/Locais
- `src/pages/ProjectB/PreLP2.tsx`: substituir bloco do `<video>` pelo `<vturb-smartplayer>` e adicionar `useEffect` para scripts/preloads e timers.
- Opcional: `index.html` para consolidar hints de preload/dns-prefetch.

Se aprovar, aplico as mudanças e valido localmente em seguida.