<template lang="pug">
.h-full.flex.flex-col.items-end.py-15.bg-base.px-4.box-border.fixed.z-10.top-0.transition-all(:class="['md\:relative',showMenu?'translate-x-0':'translate-x-[-100%]']")
    .text-5xl.font-bold.text-main.mb-40
        //- h1.user.leading-10 LAVAC
        FlipDisplay(:value="currentMenu" :num="6" :duration="60")
    NavList(@change="changeMenu")
    .flex
    .w-screen.flex.h-12.px-2.box-border.items-center.bg-desc.absolute.left-full.top-0.backdrop-blur-sm(class="md\:hidden")
        .i-mdi-menu.text-2xl(@click="toggleMenu")
</template>

<script lang="ts" setup>
const currentMenu=ref('abc')
const showMenu=ref(false)
const changeMenu=(menu:string)=>{
    currentMenu.value=menu
    if(showMenu.value){
        toggleMenu()
    }
}
const toggleMenu=()=>{
    showMenu.value=!showMenu.value
}
</script>

<style lang="scss" scoped>
.user{
    // 因为行高的关系用repeat效果不太好，还是手写了
    mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
    -webkit-mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
}
</style>