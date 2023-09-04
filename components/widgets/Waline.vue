<template lang="pug">
Waline(v-bind="walineConfig")
</template>

<script lang="ts" setup>
import {Waline} from '@waline/client/component';
const route=useRoute()
const config=useRuntimeConfig()
const walineConfig=ref({
    serverURL:config.public.WALINE_SERVER_URL,
    search:false,
    path:route.path,
    emoji:["https://unpkg.com/@waline/emojis@1.2.0/tieba"]
})
</script>

<style lang="scss" scoped>
::v-deep .wl-count{
    color:var(--main-color);
}
</style>