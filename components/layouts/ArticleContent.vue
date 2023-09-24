<template lang="pug">
main
    ContentDoc(:path="postPath" v-slot="{doc}")
        .mb-5
            h1.text-4xl.font-bold.text-main.mb-6 {{doc.title}}
            .flex.text-main.gap-x-4
                span(v-if="doc.updatedOn") 更新于 {{dayjs(doc.updatedOn).format('YYYY-MM-DD')}}
                span(v-else) 创建于 {{doc.date||'未知'}}
                

        HR    
        ContentRenderer.prose.prose-neutral(:value="doc")
    Waline 
</template>
<script lang="ts" setup>
// import Prism from 'prismjs'
const dayjs=useDayjs()
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
