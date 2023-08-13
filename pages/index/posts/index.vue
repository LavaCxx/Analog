<template lang="pug">
.flex.flex-col
    .p-1.shadow(v-for="item in data" :key="item._id")
        NuxtLink(:to="`/posts/${item._path}`" ) {{item.title}}
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData(
  'content',
  () => queryContent('/').find()
)
console.log('data',data,pending,error,refresh)
</script>