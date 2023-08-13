<template lang="pug">
.flex.text-secondary.text-xl.gap-x-2
  .py-3.px-2.h-full.flex.justify-center.align-center
    .bg-main.w-1.relative(ref="handleBar")
      .handle.transition-all.ease-out.rounded-sm.absolute.w-4.h-7.bg-primary.cursor-grab(
        class="left-1/2 translate-x--1/2 translate-y--1/2 shadow-[0px_0px_2px_0px_var(--desc-color)]",
        :style="{ top: `${topValue}%` }",
        @mousedown="onHold"
        v-if="navList.length>2"
      )
  ul.flex.flex-col.gap-y-4.w-16.text-right
    li(
      v-for="(item, index) in navList",
      :key="item.title",
      @click="navigate(index)"
      :class="[currentPageIndex===index&&'text-primary font-bold']"
    )
      NuxtLink(:to="item.link") {{ item.title }}
</template>
<script lang="ts" setup>
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
  currentPageIndex.value = index;
  topValue.value = index * step.value;
};
// 滑块移动
const onHold = (e: MouseEvent) => {
  isMoving.value = true;
  mouseY.value = e.clientY;
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUnHold);
};
const onMove = (e: MouseEvent) => {
  if (!isMoving.value) return;
  const { offsetHeight, offsetTop } = handleBar.value;
  let offsetY = +(((e.clientY - offsetTop) / offsetHeight) * 100).toFixed(2);
  topValue.value = Math.max(Math.min(offsetY, 100), 0);
};
const onUnHold = (e: MouseEvent) => {
  document.removeEventListener("mousemove", onMove);
  document.removeEventListener("mouseup", onUnHold);
  isMoving.value = false;
  topValue.value = findNearestSegment(step.value, topValue.value);
  let newIndex=Math.floor(topValue.value / step.value)
  if(newIndex!==currentPageIndex.value){
    console.log('currentPage.value',currentPage.value)
    navigate(newIndex);
    router.push(navList.value[newIndex].link)
      
      
  }
  
};
// 寻找最近分段
function findNearestSegment(step: number, value: number) {
  let segments = [0];
  while ((segments.at(-1) || 0) + step <= 100) {
    segments.push((segments.at(-1) || 0) + step);
  }
  let nearestSegment = null;
  let minDistance = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < segments.length; i++) {
    const distance = Math.abs(value - segments[i]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestSegment = segments[i];
    }
  }
  return nearestSegment || 0;
}
</script>
<style lang="scss" scoped>
.handle {
  background-image: repeating-linear-gradient(
    to bottom,
    var(--accent-color),
    var(--accent-color) 6px,
    var(--primary-color) 6px,
    var(--primary-color) 8px
  );
}
</style>