<template lang="pug">
NuxtLink.p-3.block.cursor-pointer.transition-all.border-l-4.border-sub.flex.gap-x-2(class="hover:bg-desc hover:border-sub" :to="`${url}`" )
    img.w-20.h-20(v-if="favicon" :src="favicon||''")
    .flex.flex-col
        h2.font-bold.text-xl.text-main.italic {{title}}
        .mt-2 {{description}}
</template>

<script lang="ts" setup>
export interface Props{
    favicon?:string,
    title:string,
    description?:number,
    url:string,
}
defineProps<Props>();
</script>