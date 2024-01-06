<template lang='pug'>
.w-full
  .friend-list.grid.grid-cols-2.gap-x-6.gap-y-8.auto-rows-min.box-border.pb-10(class="sm\:md\:grid-cols-2 md\:grid-cols-3")
    FriendCard(:class="['friend-item',!state&&'init']" v-for="(friend,index) in data" :key="friend._id" v-bind="friend" :style="'--i:'+(index)")
  Waline
</template>

<script lang="ts" setup>

const { data, pending, error, refresh } = await useAsyncData(
  'friend',
  () => queryContent('/friend').find()
)
let state=useFriendInit()

onUnmounted(()=>{
  state.value=true
})
</script>

<style lang="scss" scoped>
.friend-list {
    --delay: 0.1s;
    --i:0;
  .friend-item{
    &.init{
      animation: fadeIn 1s ease-out forwards ;
      transform: translateY(50%);
      opacity: 0;
      animation-delay: calc(var(--delay) * var(--i));
    }
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>