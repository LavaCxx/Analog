<template lang="pug">
main
    ContentDoc(:path="'/posts/'+path" v-slot="{doc}")
        .mb-10
            h1.text-3xl.font-bold.text-main.mb-6 {{doc.title}}
        ContentRenderer.prose.prose-slate(:value="doc")
    
</template>
<script lang="ts" setup>
const route = useRoute()

console.log('route',route)
const routePath=computed(() => route.path);
const path = route.params.path as Array<string>
</script>