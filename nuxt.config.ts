// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: ['@prisma/nuxt', '@nuxt/ui', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        class: 'dark'
      }
    }
  },
  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'error',
        'mintgreen'
      ]
    }
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
})