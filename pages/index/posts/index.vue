<template lang="pug">
.flex.flex-col.gap-y-4.h-full
      ArticleItem(v-for="item in data" :key="item._id" :data="item")
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData(
  'posts',
  () => queryContent('/posts').where({incomplete:{$ne:true}}).sort({createdOn:-1}).find()
)
console.log('data',data)

</script>
