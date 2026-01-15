// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    'vue3-carousel-nuxt',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Principe & Merit',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['modern-normalize/modern-normalize.css', '~/assets/styles/app.scss'],
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  routeRules: {
    '/': { prerender: true },
    '/login': { prerender: true },
    '/book-appointment': { prerender: true },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    provider: 'google',
  },
})
