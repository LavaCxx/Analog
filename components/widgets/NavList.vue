<template lang="pug">
.flex.text-sub.text-xl.gap-x-2
  .py-2.px-2.h-full.flex.justify-center.align-center
    .bg-blank.w-6.relative.flex.flex-col.justify-between.items-end(ref="scaleBar")
        .w-3.h-3px.bg-sub(v-for="item in navList.length" :key="item")
        .w-5.h-2px.bg-primary.absolute.handle.transition-all.opacity-95(:style="{'top':`calc(${topValue}%`}")
  ul.flex.flex-col.gap-y-4.w-16.text-right.select-none
    li(
      v-for="(item, index) in navList",
      :key="item.title",
      @click="navigate(index)"
      :class="[currentPageIndex===index&&'text-main font-bold']"
    )
      NuxtLink(:to="item.link") {{ item.title }}
</template>
<script lang="ts" setup>
const scaleBar=ref();
const router = useRouter();
const navList = ref([
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Post",
    link: "/posts",
  },
  {
    title: "Memo",
    link: "/memos",
  },
  {
    title: "Friend",
    link: "/friend",
  },
  {
    title: "About",
    link: "/about",
  },
]);
// 鼠标点击位置
const mouseY = ref(0);
// 滑块ref
const handleBar = ref();
// 当前菜单索引
const currentPageIndex = ref(0);
// 分段长度（百分比）
const step = ref(0);
step.value = +(100 / (navList.value.length - 1)).toFixed(2);
// 滑块移动状态
const isMoving = ref(false);
// 滑块移动距离
const topValue = ref(0);
// 当前菜单对象
const currentPage = computed(() => {
  return navList.value[currentPageIndex.value];
});
// 跳转
const navigate = (index: number) => {
    console.log(scaleBar)
    const {offsetHeight}=scaleBar.value
  currentPageIndex.value = index;
  topValue.value = (index * step.value)*offsetHeight/(offsetHeight+2);
};
  
</script>
<style lang="scss" scoped>

</style>