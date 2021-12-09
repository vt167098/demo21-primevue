import vue from '@vitejs/plugin-vue'

const path = require('path')

/**
 * @type {import('vite').UserConfig}
 */
export default {
    plugins: [vue()],
    server: {
        proxy: {
            '/demo21': {
                target: 'http://localhost:8080/api/demo21',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/demo21/, '')
            },
            '/redis': {
                target: 'http://192.6.1.48:3012/redis',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/redis/, '')
            },

        }
    }
}