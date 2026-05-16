import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Expose CRA-style REACT_APP_* from .env so Adam branch Firebase keys still work
  envPrefix: ["VITE_", "REACT_APP_"],
})
