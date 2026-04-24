import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const k of Object.keys(env)) {
    if (process.env[k] === undefined) {
      process.env[k] = env[k];
    }
  }
  const API_URL = env.VITE_BASE_PATH || '/';
  const devPort = Number(
    (env as Record<string, string | undefined>).VITE_DEV_SERVER_PORT ||
      process.env.VITE_DEV_SERVER_PORT ||
      3000
  );
  const appTitle = env.VITE_TITLE || 'ZetaRe';
  const manifestDescription =
    env.VITE_MANIFEST_DESCRIPTION || 'ZetaRe for Flor de Aragua C.A — data collection and guided business flows.';

  return {
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      port: devPort,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: [
        // { find: '', replacement: path.resolve(__dirname, 'src') },
        // {
        //   find: /^~(.+)/,
        //   replacement: path.join(process.cwd(), 'node_modules/$1')
        // },
        // {
        //   find: /^src(.+)/,
        //   replacement: path.join(process.cwd(), 'src/$1')
        // }
        // {
        //   find: 'assets',
        //   replacement: path.join(process.cwd(), 'src/assets')
        // },
      ]
    },
    base: API_URL,
    plugins: [
      react(),
      viteTsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'favicon.svg', 'favicon-96x96.png', 'apple-touch-icon.png', 'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png'],
        manifest: {
          name: appTitle,
          short_name: appTitle,
          description: manifestDescription,
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          orientation: 'portrait-primary',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/web-app-manifest-192x192.png',
              type: 'image/png',
              sizes: '192x192',
              purpose: 'maskable any'
            },
            {
              src: '/web-app-manifest-512x512.png',
              type: 'image/png',
              sizes: '512x512',
              purpose: 'maskable any'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\./i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html'
        }
      })
    ]
  };
});
