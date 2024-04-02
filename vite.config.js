import { defineConfig } from 'vite'

export default defineConfig({
	root: './',
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				app: './static/index.html'
			}
		}
	},
	server: {
		port: 3000,
		open: './static/index.html'
	},
	publicDir: './static/assets',
})
