<template lang="pug">
NuxtLink.p-3.block.rounded.cursor-pointer.transition-all(class="hover:bg-desc" :to="`${_path}`" )
    h2.font-bold.text-xl.text-main.italic {{title}}
    .mt-2 {{description}}
    .mt-2.text-sub.font-bold
        span C:\{{date}}
        span \tag\{{tags.join('_')}}>
        
        
</template>

<script lang="ts" setup>
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

let props=defineProps<{
  data: MarkdownParsedContent
}>()
const {title,description,date,tags=[],category,_path}=props.data
</script>