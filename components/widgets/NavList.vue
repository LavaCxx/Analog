<template lang="pug">
.flex.text-sub.text-xl.gap-x-2.flex-row-reverse
  .px-2.h-full.flex.justify-center.align-center
    .scaleBar.bg-desc.w-6.relative.flex.flex-col.justify-between.items-center(ref="scaleBar" :style="{'--scale-len':step+'%'}")
        //- .w-3.h-3px.bg-sub(v-for="item in navList.length" :key="item")
        .w-4.h-4px.left-0.backdrop-opacity-10.backdrop-blur-sm.bg-primary.absolute.transition-all.opacity-95(class="ease-[cubic-bezier(.93,1.71,.6,.77)]" :style="{'top':`calc(${topValue}%`}")
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
  topValue.value = (index * step.value)*offsetHeight/(offsetHeight+4);
};
  
</script>
<style lang="scss" scoped>
.scaleBar{
  --scale-len:10%;
			background-image: repeating-linear-gradient(to bottom, #000000 11px, #000000 13px, transparent 0, transparent calc(2rem + 24px)),
      repeating-linear-gradient(to bottom, #000000 5.5px, #000000 6.5px, transparent 0, transparent calc(1rem + 12px))
			// repeating-linear-gradient(to bottom, #000000 calc(12px + 0.5rem), #000000 calc(13px + 0.5rem), transparent 0, transparent calc((1rem + 12px))),
			// repeating-linear-gradient(to bottom, #000000 11.5px, #000000 12.5px, transparent 0, transparent calc(.5rem + 6px)),
      ;
			background-size: 10px 100% ,6px  100% , 4px 100% ;
			background-repeat: no-repeat;
			background-position: 0.05em 100%, 0.05em 100%, 0.05em 100%;
}
</style>