
// https://nuxt.com/docs/api/configuration/nuxt-config
import Unocss from 'unocss/vite'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
  css: ['@unocss/reset/tailwind.css','@waline/client/dist/waline.css','~/assets/styles/main.scss'],
  vite: {
    plugins: [
      Unocss()
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
})
