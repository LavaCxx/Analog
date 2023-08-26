import { TransitionProps } from "nuxt/dist/app/compat/capi"

export default defineNuxtRouteMiddleware((to,from) => {
  const navList = useNav()
  const navLinks=navList.value.map(v=>v.link)
  let toPath=to.path.match(/\/[^\/]*/)?.[0]||'/'
  let fromPath=from.path.match(/\/[^\/]*/)?.[0]||'/'
  // console.log('to',to,from)
  if(to.meta.pageTransition){
    let pageTransition=to.meta.pageTransition as TransitionProps 
    pageTransition.name = (navLinks.findIndex(v=>v===toPath) > navLinks.findIndex(v=>v===fromPath) ? 'slide-up' : 'slide-down')
  }
  
  // console.log('navList',navList)
  // console.log('to',to,from)
})
