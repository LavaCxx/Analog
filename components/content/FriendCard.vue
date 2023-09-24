<template lang="pug">

NuxtLink.floppy-disk( :to="`${url}`" )
    .top-cover
        .top-cover__info  Friend
            .top-cover__domain {{matchDomain(url)}}
    .label-area
        .label-area__title {{title}}
        .label-area__description {{description}}
        img.label-area__favicon(:src="favicon" v-if="favicon")
    .icon-up.i-mdi-arrow-up-bold
</template>

<script lang="ts" setup>
export interface Props {
  favicon?: string;
  title: string;
  description?: string;
  url: string;
}
defineProps<Props>();
const matchDomain = (url: string) => {
  return url.match(/\.[a-z]*(?=[^.]*$)/)?.[0] || "";
};
</script>
<style lang="scss" scoped>
.floppy-disk {
  width: 100%;
  aspect-ratio: 1/1;
  background-color: var(--base-color);
  clip-path: polygon(
    0 0,
    80% 0,
    80% 1.5%,
    82% 1.5%,
    84% 0,
    94% 0,
    100% 6%,
    100% 100%,
    0 100%
  );
  border-radius: 0.2rem;
  box-sizing: border-box;
  // border:.1rem solid var(--sub-color);
  pointer-events: auto;
  box-shadow: 0 0 0.1rem var(--main-color);
  position: relative;
  cursor: pointer;
  // transform: translateZ(-.2rem);
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    .label-area {
      &__title {
        background-size: 100% 3px;
      }
    }
  }
  &::before,
  &::after {
    content: "";
    width: 5%;
    height: 5%;
    position: absolute;
    bottom: 4%;
    left: 2.5%;
    border-radius: 0.1rem;
    background-color: var(--sub-color);
  }
  &::after {
    left: unset;
    right: 2.5%;
  }
  .top-cover {
    width: 70%;
    height: 35%;
    margin-left: 10%;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0 0 0.1rem var(--sub-color) inset;
    &__info {
      font-weight: bold;
      margin-left: 21%;
      // width: 75%;
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--blank-color);
      border-radius: 0 0 0.5rem 0.5rem;
      padding-right: 50%;
      box-sizing: border-box;
      padding: 3% 32% 5% 3%;
      color: var(--main-color);
      position: relative;
      font-size: 1rem;
      &::after {
        content: "";
        position: absolute;
        width: 25%;
        height: 86%;
        right: 12%;
        top: 7%;
        border-radius: 0.2rem;
        background-color: var(--base-color);
      }
    }
    &__domain {
      background-color: var(--main-color);
      color: var(--blank-color);
      width: min-content;
      padding: 0 0.2rem;
      font-size: 0.8rem;
    }
  }
  .label-area {
    width: 80%;
    height: 65%;
    margin-top: 10%;
    margin-left: 10%;
    box-sizing: border-box;
    line-height: 1rem;
    padding: 4%;
    color: var(--main-color);
    background-color: var(--blank-color);
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow:
      0 -1rem var(--primary-color) inset,
      0 -2rem var(--secondary-color) inset,
      0 -3rem var(--accent-color) inset;
    position: relative;
    padding-bottom:3rem;
    box-sizing:border-box;
    &__title {
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      background-image: linear-gradient(
        90deg,
        var(--main-color),
        var(--main-color)
      );
      background-size: 0 3px;
      background-repeat: no-repeat;
      background-position: 0 100%;
      display: inline-block;
      line-height: 1.75rem;
      transition: 0.2s all;
    }
    &__description {
      cursor: pointer;
      margin-top: 0.2rem;
      font-size: 0.8rem;
    }
    &__favicon {
      width: 35%;
      aspect-ratio: 1/1;
      margin-top:0.2rem;
      border: 0.1rem solid var(--main-color);
    }
  }
  .icon-up {
    position: absolute;
    left: 1.25%;
    top: 2%;
    font-size: min(4vw, 1.5rem);
    color: var(--sub-color);
    transform: scaleY(1.3);
  }
}
</style>
