<template lang="pug">
.flip-item(:class="[isFlip&&'is-flip']" :style="{'--duration':duration+'ms'}")
    .card.front(:attr-str="curVal[0]")
    .card.back(:attr-str="curVal[1]")
</template>

<script lang="ts" setup>
let props = defineProps<{
  value: string[];
  duration: number;
}>();
let queue: string[][] = [];
const isFlip = ref(false);
const curVal = ref(props.value);
const flip = () => {
  if (isFlip.value || queue.length === 0) return;
  let val = queue.shift();
  if (!val || val[0] === val[1]) return;
  curVal.value = val;
  isFlip.value = true;
  setTimeout(() => {
    isFlip.value = false;
    curVal.value[0] = curVal.value[1];
  }, props.duration);
};
watch(()=>props.value, (newVal)=>{
    queue.push(newVal)
})
onMounted(() => {
  setInterval(() => {
    flip();
  }, props.duration);
});
</script>

<style lang="scss" scoped>
.flip-item {
  display: inline-block;
  position: relative;
  width: 1.6rem;
  height: 2.7rem;
  line-height: 2.7rem;
  border: solid 1px var(--blank-color);
  border-radius: .2rem;
  background: var(--main-color);
  font-size: 1.6rem;
  color: var(--main-color);
  box-shadow: 0 0 .1rem var(--sub-color);
  text-align: center;
  font-family: "Helvetica Neue";
  --duration: 600ms;
  .card {
  &::before,
  &::after {
    content: attr(attr-str);
    position: absolute;
    left: 0;
    right: 0;
    background-color: var(--blank-color);
    overflow: hidden;
    box-sizing: border-box;
  }
  &::before {
    top: 0;
    bottom: 50%;
    border-radius: .2rem .2rem 0 0;
    border-bottom: 1px solid var(--sub-color);
  }
  &::after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 .2rem .2rem;
    line-height: 0;
  }
}
.front {
  &::before {
    z-index: 3;
  }
  &::after {
    z-index: 1;
  }
}
.back {
  &::before {
    z-index: 1;
  }
  &::after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(160px) rotateX(180deg);
  }
}
&.is-flip {
  .front {
    &::before {
      transform-origin: 50% 100%;
      animation: frontFlipDown var(--duration) ease-in-out both;
      box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
      backface-visibility: hidden;
    }
  }
  .back {
    &::after {
      animation: backFlipDown var(--duration) ease-in-out both;
    }
  }
}

}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>