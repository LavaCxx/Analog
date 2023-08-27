<template lang='pug'>
.h-full.grid.grid-cols-3.gap-x-6.gap-y-4.auto-rows-min
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