
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
  css: ['@unocss/reset/tailwind.css', '~/assets/styles/base.scss', '~/assets/styles/var.scss'],
  vite: {
    plugins: [
      Unocss()
    ]
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
})
