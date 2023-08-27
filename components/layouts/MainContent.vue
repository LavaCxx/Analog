<template lang="pug">
.py-15.px-4.overflow-y-auto.border-x-1.border-sub.relative
    .loading.absolute.top-0.left-0.w-full.h-full.flex.justify-center.items-center(v-show="loading")
    NuxtPage
</template>

<script lang="ts" setup>
  const nuxtApp = useNuxtApp();
  const loading = ref(false);
  const minLoadingTime = 400;
  let currentLoadingTime=0
  nuxtApp.hook("page:start", () => {
    loading.value = true;
    currentLoadingTime=performance.now()
  });
  nuxtApp.hook("page:finish", () => {
    let nextTime=performance.now()+minLoadingTime
    // setTimeout(()=>{
        loading.value = false; 
    // },nextTime-currentLoadingTime)
        
  });
</script>

<style lang="scss" scoped>
.loading{
    &::after{
        content:'-';
        animation: loading .4s linear infinite;
        color:var(--main-color);
        font-size: 3rem;
    }
    @keyframes loading {
        0%{
            content:'—'
        }
        25%{
            content:'\\'
        }
        50%{
            content: '|';
        }
        75%{
            content:'/'
        }
        100%{
            content:'—';
        }
    }
}
</style>