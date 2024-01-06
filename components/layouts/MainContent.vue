<template lang="pug">
.py-15.px-8.overflow-y-auto.relative.border-r-1.border-sub
    .loading.absolute.top-0.left-0.w-full.flex.justify-center.items-center.pointer-events-none.z-10(v-if="loading")
    NuxtPage
</template>

<script lang="ts" setup>
definePageMeta({
    keepalive: true//设置为keepAlive
})
const nuxtApp = useNuxtApp();
const loading = ref(false);
const minLoadingTime = 400;
let startLoadingTime = 0;
nuxtApp.hook("page:start", () => {
  loading.value = true;
  startLoadingTime = performance.now();
});
nuxtApp.hook("page:finish", () => {
  let loadingTime = Math.max(
    minLoadingTime - performance.now() + startLoadingTime,
    0,
  );
  setTimeout(() => {
    loading.value = false;
  }, loadingTime);
});
</script>

<style lang="scss" scoped>
.loading {
  height: 100%;
  &::after {
    content: "-";
    animation: loading 0.4s linear infinite;
    color: var(--main-color);
    font-size: 3rem;
  }
  @keyframes loading {
    0% {
      content: "—";
    }
    25% {
      content: "\\";
    }
    50% {
      content: "|";
    }
    75% {
      content: "/";
    }
    100% {
      content: "—";
    }
  }
}
</style>
