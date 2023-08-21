<template lang="pug">
.flex.flex-col.justify-between.items-end.py-15
    .text-5xl.font-bold.text-main.mb-20
        //- h1.user.leading-10 LAVAC
        FlipDisplay(:value="currentMenu" :num="6" :duration="60")
    NavList(@change="changeMenu")
    .flex
</template>

<script lang="ts" setup>
const currentMenu=ref('abc')
const changeMenu=(menu:string)=>{
    currentMenu.value=menu
}
//  const router = useRouter()
// onMounted(()=>{
    
//     console.log(path.match(/(?<=^\/)[^\/]*/)?.[0]||'home')
//     changeMenu(path.match(/(?<=^\/)[^\/]*/)?.[0]||'home')
// })
</script>

<style lang="scss" scoped>
.user{
    // 因为行高的关系用repeat效果不太好，还是手写了
    mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
    -webkit-mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
}
</style>