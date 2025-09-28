import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint2';
import { type UserConfig } from 'vite';

export default defineConfig({
  plugins: [react(), eslint()],
} as UserConfig);
