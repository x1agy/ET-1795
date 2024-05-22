import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    base: mode === 'production' ? '/dashboard' : '/',
    server: {
      port: (process.env as any).VITE_PORT || 3000,
      proxy: {
        '/api': (process.env as any).VITE_BASE_URL,
      },
    },
    plugins: [
      react(),
      eslintPlugin({
        cache: false,
        include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
        exclude: ['./src/locales/**/*.ts', 'vite.config.ts'],
      }),
    ],
    build: {
      sourcemap: mode === 'development',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        pages: path.resolve(__dirname, './src/pages'),
        types: `${path.resolve(__dirname, './src/types')}`,
        utils: `${path.resolve(__dirname, './src/utils')}`,
        hooks: `${path.resolve(__dirname, './src/hooks')}`,
        $: `${path.resolve(__dirname, './src/assets')}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'src/style/variables/index';`,
        },
      },
    },
  };
});
