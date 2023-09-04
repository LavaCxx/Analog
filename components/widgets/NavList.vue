<template lang="pug">
.flex.text-sub.text-xl.gap-x-2.flex-row
  .px-2.h-full.flex.justify-center.align-center
    .scaleBar.bg-desc.w-6.relative.flex.flex-col.justify-between.items-center.rounded-l.border-r-2(class="border-[var(--main-color)]" ref="scaleBar" :style="{'--scale-len':'calc('+step+'%)'}")
        .w-4.h-2px.right-0.backdrop-opacity-10.backdrop-blur-sm.bg-primary.absolute.transition-all.opacity-95(v-show="topValue>0" class="shadow-[0_0_2px_var(--primary-color)] ease-[cubic-bezier(.93,1.71,.6,.77)]" :style="{'top':`calc(${topValue}%`}")
  ul.flex.flex-col.gap-y-4.w-16.text-right.select-none
    li.select-none(
      v-for="(item, index) in navList",
      :key="item.title",
      @click="navigate(index)"
      :class="[currentPageIndex===index&&'text-main']"
    )
      NuxtLink.w-full.inline-block(:to="item.link") {{ item.title }}
</template>
<script lang="ts" setup>
const scaleBar=ref();
const emit=defineEmits(['change'])
const router = useRouter();
const navList = useNav();
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
// 移动模块
const setTopValue=(index:number)=>{
   const {offsetHeight}=scaleBar.value
  let minValue=11/offsetHeight*100
  topValue.value = (index * step.value)*offsetHeight/(offsetHeight+2)*((offsetHeight-16)/(offsetHeight+2))+minValue
}
// 滑块移动距离
const topValue = ref(0);


// 当前菜单对象
const currentPage = computed(() => {
  return navList.value[currentPageIndex.value];
});
// 跳转
const navigate = (index: number) => {
   setTopValue(index)
    emit('change',navList.value[index].title)
  currentPageIndex.value = index;
};
onMounted(()=>{
  const path=router.currentRoute.value.path
  const title=path.match(/(?<=^\/)[^\/]*/)?.[0]||''
  setTopValue(navList.value.findIndex(item=>item.link===`/${title}`))
  emit('change',title||navList.value[0].title)
})

</script>
<style lang="scss" scoped>
.scaleBar{
  --scale-len:10%;
			background-image: repeating-linear-gradient(to bottom, #000000 10px, #000000 14px, transparent 0, transparent calc(2rem + 24px));
			background-size: 10px 100%;
			background-repeat: no-repeat;
      background-position: calc(100% - 2px) 100%;
}
</style>