<template lang="pug">
.flex.justify-center.gap-x-8
    NuxtLink.text-3xl.cursor-pointer(v-for="account in socialList" :class="account.icon" :title="account.name" :key="account.name" :to="account.link" target="_blank") {{account.name}}
</template>

<script setup lang="ts">
const socialList=ref([
    {
        name:'Github',
        icon:'i-mdi-github',
        link:'https://github.com/LavaCxx'
    },
    {
        name:'Email',
        icon:'i-mdi-email',
        link:'mailto:lavac@foxmail.com'
    },
    {
        name:'Steam',
        icon:'i-mdi-steam',
        link:'https://steamcommunity.com/id/FI7860/'
    },
    {
        name:'BiliBili',
        icon:'i-tabler-brand-bilibili',
        link:'https://space.bilibili.com/3086598'
    }

])
</script>

<style>

</style>