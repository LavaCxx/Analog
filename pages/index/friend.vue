<template lang='pug'>
.h-full.grid.grid-cols-2.gap-x-2.gap-y-4.grid-flow-row.auto-rows-auto
    FriendCard(v-for="friend in data" :key="friend._id" v-bind="friend")
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData(
  'friend',
  () => queryContent('/friend').find()
)
</script>

<style>

</style>