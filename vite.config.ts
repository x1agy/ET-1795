import { defineConfig, loadEnv } from 'vite';
//@ts-expect-error tf i don't care if it is deprecated
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    server: {
      proxy: {
        '/commonTask': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
      port: 3000,
    },
    plugins: [
      eslintPlugin({
        cache: false,
        include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
        exclude: ['./src/locales/**/*.ts', 'vite.config.ts'],
      }),
    ],
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
