import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    extract: 'output.css', // Sets the output filename for extracted CSS
  },
  server: {
    port: 3030,
  }
})
