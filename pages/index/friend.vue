<template lang='pug'>
.friend-page.h-full.grid.grid-cols-3.gap-x-6.gap-y-8.auto-rows-min.box-border.overflow-y-auto.pb-10
    //- FriendCard(v-for="friend in data" :key="friend._id" v-bind="friend")
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncData(
  'friend',
  () => queryContent('/friend').find()
)
</script>

<style lang="scss" scoped>
.friend-page{
  perspective: 100px;
}
</style>