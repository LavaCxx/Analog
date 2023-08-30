<template lang="pug">
.flex.items-center.text-center.gap-x-2.select-none(@click="toggleTheme")
    .w-7.h-3.cursor-pointer(:class="isDark?'bg-main shadow-[.1rem_.1rem_.1rem_var(--sub-color)]':'bg-primary shadow-[0_0_.5rem_var(--primary-color)]'" )
    .text-main.cursor-pointer Lighter
</template>

<script lang="ts" setup>
const isDark = ref(false)
const toggleTheme = () => {
    isDark.value = !isDark.value
    if(isDark.value){
        document.body.classList.add('dark')
    }else{
        document.body.classList.remove('dark')
    }
}
</script>

<style>

</style>