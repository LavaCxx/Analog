<template lang="pug">
ArticleContent
</template>
<script lang="ts" setup>
const route = useRoute()
const post = route.params.post as Array<string>
const path=post.join('/')
</script>