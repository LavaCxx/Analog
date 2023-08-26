<template lang="pug">
main
    ContentDoc(:path="'/posts/'+postPath" v-slot="{doc}")
        .mb-5
            h1.text-4xl.font-bold.text-main.mb-6 {{doc.title}}
            .grid.text-main
                span 发布于 {{doc.date}}

        HR    
        ContentRenderer.prose.prose-slate(:value="doc")
    Waline( :serverURL="serverURL" :path="routePath" :search="false")
</template>
<script lang="ts" setup>
import { Waline } from '@waline/client/component';
// import '@waline/client/dist/waline.css';
const serverURL= process.env.VUE_APP_API_URL;
const route = useRoute()

console.log('route',route)
const routePath=computed(() => route.path);
const postPath = route.params.path as Array<string>
</script>