<template lang="pug">
NuxtLink.p-3.block.cursor-pointer.transition-all.border-l-4.border-sub(class="hover:bg-desc hover:border-sub" :to="`${_path}`" )
    h2.font-bold.text-xl.text-main.italic {{title}}
    .mt-2.text-ellipsis.line-clamp-2 {{description}}
    .mt-2.text-sub.font-bold
        span C:\{{date}}
        span \{{tags.join('_')}}>
        
        
</template>

<script lang="ts" setup>
import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";

let props = defineProps<{
  data: MarkdownParsedContent;
}>();
const { title, description, date, tags = [], category, _path } = props.data;
</script>
