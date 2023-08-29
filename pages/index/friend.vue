<template lang='pug'>
.friend-page.h-full.grid.grid-cols-2.gap-x-6.gap-y-8.auto-rows-min.box-border.pb-10(class="md\:grid-cols-3")
    FriendCard(v-for="friend in data" :key="friend._id" v-bind="friend")
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