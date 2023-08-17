<template lang="pug">
.text-main
    .flex.justify-center
        .text-5xl.text-center
            h1 Hi, there, I'm 
            h1.user.leading-10.font-bold LAVAC
            h2.text-2xl.text-sub A humble explorer of AnyScript
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.user{
    // 因为行高的关系用repeat效果不太好，还是手写了
    mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
    -webkit-mask:linear-gradient(to bottom,#000,#000 28%,transparent 28%,transparent 33%,#000 33%,#000 53%,transparent 53%,transparent 58%,#000 58%,#000 77%,transparent 77%,transparent 82%, #000 82%,#000);
}
</style>