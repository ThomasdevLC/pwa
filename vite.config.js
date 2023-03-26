import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import {VitePWA} from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'GSTAT-APV',
                short_name: 'gstatApv',
                description: 'Suivi après vente',
                theme_color: '#ffffff',
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        "src": "/android-chrome-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
                force: true
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
