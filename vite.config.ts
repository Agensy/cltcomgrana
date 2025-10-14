import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin personalizado para garantir que o script principal seja incluído
const ensureMainScript = () => {
  return {
    name: 'ensure-main-script',
    transformIndexHtml(html: string) {
      // Sempre adiciona o script principal se não estiver presente
      if (!html.includes('assets/js/index-')) {
        html = html.replace(
          '<div id="root"></div>',
          '<div id="root"></div>\n    <script type="module" crossorigin src="/assets/js/index-CzXZQ8Sp.js"></script>'
        );
      }
      return html;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : []),
    ensureMainScript()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    cssCodeSplit: true, // Divide CSS em chunks menores
    rollupOptions: {
      output: {
        // Estratégia de chunking para CSS crítico
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-accordion', '@radix-ui/react-toast'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
        // Nomes de arquivo com hash para cache
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Compressão e minificação
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
}));
