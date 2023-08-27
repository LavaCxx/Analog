<template lang="pug">
NuxtLink.overflow-hidden.relative.rounded.p-3.block.cursor-pointer.transition-all.flex.flex-col.gap-x-2.bg-desc(class="hover:bg-desc" :to="`${url}`" )
    .flex.flex-col.font-bold.text-main 
        h2.text-2xl {{title}}
        span.text-xl {{description}}
    img.w-20.h-20(v-if="favicon" :src="favicon||''")
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