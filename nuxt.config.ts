
// https://nuxt.com/docs/api/configuration/nuxt-config
// import Unocss from 'unocss/vite'
// import prismjs from 'vite-plugin-prismjs'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      WALINE_SERVER_URL: process.env.WALINE_SERVER_URL
    }
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    'dayjs-nuxt'
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
  css: ['@unocss/reset/tailwind.css', '@waline/client/dist/waline.css', '~/assets/styles/main.scss'],
  vite: {
    // plugins: [
    //   prismjs({
    //     languages:[
    //       'bash','sql','html','css','json','md','ts','javascript','scss','sass','shell'
    //     ],
    //     plugins:['toolbar','show-language','copy-to-clipboard'],
    //     theme: "tomorrow",
    //     css:true
    //   }),
    // ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'LavaCx',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
      ]
    }
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
})
