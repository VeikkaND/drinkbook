import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    svgr({
      svgrOptions: {
        
      }
    })
  ],
  base: "/drinkbook" ,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})
