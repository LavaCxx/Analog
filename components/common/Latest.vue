<template lang="pug">
.pt-4
    .text-3xl.font-bold Latest
    .flex.flex-col.gap-y-4.h-full.mt-4
        ArticleItem(v-for="item in data" :key="item._id" :data="item")
</template>
<script lang="ts" setup>
interface Props{
    limit?:number
}
const props=defineProps<Props>();
const limit=props.limit||3
const { data, pending, error, refresh } = await useAsyncData(
  'posts',
  () => queryContent('/posts').where({incomplete:{$ne:true}}).find()
)
data.value=(data.value||[]).slice(0,3)
</script>