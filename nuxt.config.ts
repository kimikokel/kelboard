// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  app: {
    baseURL: '/kelboard',
    head: {
      title: 'kels to-do list',
      meta: [
        { name: 'description', content: 'A cute kanban-style task board for kel.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      baseURL: '/kelboard'
    }
  },
  routeRules: {
    '/kelboard': { redirect: '/kelboard/' },
    '/kelboard/': { ssr: false }
  }
})