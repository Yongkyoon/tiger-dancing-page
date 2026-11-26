import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages(하위 경로 /tiger-page/)에서도 asset이 로드되도록 상대 경로로 빌드
  base: './',
  plugins: [react()],
})
