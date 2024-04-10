import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: true,
	hmr: {
		overlay: false,
		},
		
  },
  assetsInclude: /\.(png|jpe?g|gif|svg)$/i,
})
