<template lang="pug">
main
    ContentDoc(:path="postPath" v-slot="{doc}")
        .mb-5
            h1.text-4xl.font-bold.text-main.mb-6 {{doc.title}}
            .grid.text-main
                span 发布于 {{doc.date||'未知'}}

        HR    
        ContentRenderer.prose.prose-neutral(:value="doc")
    Waline 
</template>
<script lang="ts" setup>
// import Prism from 'prismjs'
let props = defineProps<{
  path?: string;
}>();

const route = useRoute()
const postPath = props.path||route.params.href
// onMounted(async()=>{
//     await nextTick()
//     Prism.highlightAll()
// })
</script>
