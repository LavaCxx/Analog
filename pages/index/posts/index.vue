<template lang="pug">
.flex.flex-col.gap-y-4
      ArticleItem(v-for="item in data" :key="item._id" :data="item")
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData(
  'content',
  () => queryContent('/').find()
)
console.log('data',data.value)
</script>