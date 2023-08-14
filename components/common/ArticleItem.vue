<template lang="pug">
NuxtLink.p-3.block.rounded.cursor-pointer.transition-all(class="hover:bg-desc" :to="`/posts/${_path}`" )
    h2.font-bold.text-xl.text-main.italic {{title}}
    .mt-2 {{description}}
    .mt-2.text-sub.font-bold
        span C:\{{date}}
        span \#\{{tags.join('\\')}}>
        
        
</template>

<script lang="ts" setup>
const props=defineProps(['data'])
const {title,description,date,tags=[],category,_path}=props.data
console.log(props)
</script>