<template lang="pug">
main
    ContentDoc(:path="'/posts/'+postPath" v-slot="{doc}")
        .mb-5
            h1.text-4xl.font-bold.text-main.mb-6 {{doc.title}}
            .grid.text-main
                span 发布于 {{doc.date}}

        HR    
        ContentRenderer.prose.prose-neutral(:value="doc")
    Waline(v-bind="walineConfig")
</template>
<script lang="ts" setup>
import { Waline } from '@waline/client/component';
const config =useRuntimeConfig()

const route = useRoute()
const walineConfig=ref({
    serverURL:config.public.WALINE_SERVER_URL,
    search:false,
    path:route.path,
    emoji:["https://unpkg.com/@waline/emojis@1.2.0/tieba"]
})

const postPath = route.params.path as Array<string>
</script>