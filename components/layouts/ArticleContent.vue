<template lang="pug">
main
    ContentDoc(:path="path" v-slot="{doc}")
        .mb-10
            h1.text-3xl.font-bold.text-main.mb-6 {{doc.title}}
        ContentRenderer.prose.prose-slate(:value="doc")
</template>
<script lang="ts" setup>
const route = useRoute()
const post = route.params.post as Array<string>
const path=post.join('/')
</script>