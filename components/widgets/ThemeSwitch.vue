<template lang="pug">
.flex.flex-col.items-center.text-center.gap-x-2.select-none.relative(@click="toggleTheme")
    .text-main.border-2.border-sub.px-2 {{isDark?'Dark':'Light'}}
        
</template>

<script lang="ts" setup>
const isDark = ref(false)
const themeMenu=ref(['Light','Auto','Dark'])
const toggleTheme = () => {
    isDark.value = !isDark.value
    if(isDark.value){
        document.body.classList.add('dark')
    }else{
        document.body.classList.remove('dark')
    }
}
</script>
