<template lang="pug">

NuxtLink.floppy-disk( :to="`${url}`" )
    .top-cover
        .top-cover__info  Friend
    .label-area
        .label-area__title {{title}}
        .label-area__description {{description}}
    .icon-up.i-mdi-arrow-up-bold
</template>

<script lang="ts" setup>
export interface Props{
    favicon?:string,
    title:string,
    description?:number,
    url:string,
}
defineProps<Props>();
</script>
<style lang="scss" scoped>
.floppy-disk{
    width: 100%;
    aspect-ratio: 1/1;
    background-color: var(--base-color);
    clip-path: polygon(0 0,92% 0,100% 8%, 100% 100%,0 100%);
    border-radius: 0.2rem;
    box-sizing: border-box;
    // border:.1rem solid var(--sub-color);
    pointer-events: auto;
    box-shadow: 0 0 .1rem var(--main-color);
    position: relative;
    cursor: pointer;
    // transform: translateZ(-.2rem);
    transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover{
        .label-area{
            &__title{
                background-size: 100% 3px;
            }
        }
    }
    &::before,&::after{
        content:'';
        width: .5rem;
        height:.5rem;
        position: absolute;
        bottom: 4%;
        left: 2.5%;
        border-radius: .1rem;
        background-color: var(--sub-color);
    }
    &::after{
        left: unset;
        right: 2.5%;
    }
    .top-cover{
        width: 70%;
        height: 35%;
        margin-left: 10%;
        border-radius: 0 0 .5rem .5rem;
        box-shadow:0 0 .1rem var(--sub-color) inset;
        &__info{
            font-weight: bold;
            margin-left: 21%;
            width: 75%;
            height: 100%;
            background-color: var(--blank-color);
            border-radius: 0 0 .5rem .5rem;
            padding-right: 50%;
            box-sizing: border-box;
            padding:3% 32% 5% 3%; 
            color:var(--main-color);
            position: relative;
            font-size: .8rem;
            &::after{
                content:'';
                position: absolute;
                width: 25%;
                height: 86%;
                right: 12%;
                top: 7%;
                border-radius: .2rem;
                background-color: var(--base-color);
            }
        }
    }
    .label-area{
        width: 80%;
        height: 65%;
        margin-top: 10%;
        margin-left: 10%;
        box-sizing: border-box;
        line-height: 1rem;
        padding: 4%;
        background-color: var(--blank-color);
        border-radius: .5rem .5rem 0 0;
        box-shadow: 0 -0.5rem var(--primary-color) inset, 0 -1rem var(--secondary-color) inset, 0 -1.5rem var(--accent-color) inset;
        &__title{
            cursor: pointer;
            font-size: 1.25rem;
            font-weight: bold;
            background-image: linear-gradient(90deg,var(--main-color),var(--main-color));
            background-size: 0 3px;
            background-repeat: no-repeat;
            background-position: 0 100%;
            display: inline-block;
            line-height: 1.75rem;
            transition: 0.2s all;
        }
        &__description{
            cursor: pointer;
            margin-top: 0.2rem;
            font-size: 1rem;
        }
    }
    .icon-up{
        position: absolute;
        left: 1%;
        top: 3%;
        color:var(--sub-color);
        transform: scaleY(1.3);
    }
}
</style>