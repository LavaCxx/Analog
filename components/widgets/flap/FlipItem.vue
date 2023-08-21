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
  width: 30px;
  height: 50px;
  line-height: 50px;
  border: solid 1px #000;
  border-radius: 5px;
  background: #fff;
  font-size: 30px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
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
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }
  &::before {
    top: 0;
    bottom: 50%;
    border-radius: 5px 5px 0 0;
    border-bottom: solid 1px #666;
  }
  &::after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 5px 5px;
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