# CLT Com Grana — Projeto

## Informações do Projeto

**URL (produção)**: https://cltcomgrana.com.br

## Como editar este código?

Você pode editar sua aplicação de diversas formas.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. As alterações serão publicadas para https://cltcomgrana.com.br via workflow de deploy.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Edit" (ícone de lápis) no topo direito da visualização do arquivo.
- Faça suas alterações e realize o commit.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Como fazer deploy?

O deploy é realizado publicando o conteúdo de `dist/` via workflow/FTP conforme os arquivos em `.github/workflows/*.yml` e os checklists em `DEPLOY_CHECKLIST.md` e `DEPLOY_TARGETS.md`. O domínio de produção é `https://cltcomgrana.com.br`.
# Deploy forçado para sincronizar HTML
