import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

function resolveBasePath() {
  if (process.env.BASE_PATH) return process.env.BASE_PATH

  if (process.env.GITHUB_ACTIONS === 'true') {
    const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
    if (repository && !repository.endsWith('.github.io')) {
      return `/${repository}/`
    }
  }

  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: resolveBasePath(),
  plugins: [vue(), tailwindcss()],
})
