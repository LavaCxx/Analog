<template lang="pug">
.w-full.flex.flex-col.items-center.gap-y-2
    .w-100.h-50.bg-base.relative.mx-auto.plaid(ref="container")
        .absolute.w-5.h-5.bg-primary.aspect-square.rounded-full(:class="['translate-x--1/2','translate-y--1/2']" :style="{left:listenerLoc.x+'px',top:listenerLoc.y+'px'}")
        .absolute.w-3.h-3.rounded-full(:class="['translate-x--1/2','translate-y--1/2',isWin&&'bg-secondary']" :style="{left:targetLoc.x+'px',top:targetLoc.y+'px'}")
    button.bg-main.text-blank.px-2(@click="togglePlay") {{isPlay?'Reset':'Start'}}
    p ↑↓←→控制方向，空格键确认目标
</template>

<script lang="ts" setup>
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillator: OscillatorNode | null = null;
let panner: PannerNode | null = null;
let listener: AudioListener | null = null;
const container = ref();
let moveTimerId: number | null = null;
let isPlay = ref(false);
let isInit: boolean = false;
let isWin = ref(false);
let checkSize=ref(5)
const listenerLoc = ref({
  x: 20,
  y: 20,
});
const targetLoc = ref({
  x: 100,
  y: 50,
});
const keyCache = reactive({
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
});
onMounted(() => {
listenerLoc.value={
    x:checkSize.value*2,
    y:checkSize.value*2
}
  audioCtx = new AudioContext();
  gainNode = audioCtx.createGain();
  oscillator = audioCtx.createOscillator();
  panner = audioCtx.createPanner();
  listener = audioCtx.listener;
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  moveTimerId = requestAnimationFrame(moveListener);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
  if (moveTimerId) {
    cancelAnimationFrame(moveTimerId);
    moveTimerId = null;
  }
});

const setRandomLoc = () => {
  const { clientWidth, clientHeight } = container.value;
  targetLoc.value = {
    x: getRandomNum(20, clientWidth - 20),
    y: getRandomNum(20, clientHeight - 20),
  }; 
};
const initAudio = () => {
  if (!audioCtx || !oscillator || !panner || !listener || !gainNode) return;
  oscillator.type = "triangle";
  oscillator.frequency.value = 440;
  gainNode.gain.value = 10;
  oscillator.detune.value = 0;
  panner.rolloffFactor = 0.1;
  oscillator.connect(gainNode);
  gainNode.connect(panner);
  panner.connect(audioCtx.destination);
  oscillator.start();
};
const makeSound = () => {
  if (!audioCtx || !oscillator || !panner || !listener || !gainNode) return;
  const rate = calcDistance().rate;
  panner.setPosition(targetLoc.value.x, targetLoc.value.y, 1);
  listener.setPosition(listenerLoc.value.x, listenerLoc.value.y, 1);
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
  let endTime = rate * 1;
  //   oscillator.frequency.value = 230/rate;
  gainNode.gain.exponentialRampToValueAtTime(0.01, endTime + audioCtx.currentTime);
  if (!isPlay.value) return;
  setTimeout(() => {
    makeSound();
  }, endTime * 1000);
};
const onKeyDown = (event: KeyboardEvent) => {
  if (!isPlay.value) return;
  const { code } = event;
  if (code === "Space") {
    event.preventDefault();
    checkState();
  }
  if (Reflect.has(keyCache, code)) {
    event.preventDefault();
    keyCache[code] = true;
  }
};
const onKeyUp = (event: KeyboardEvent) => {
  const { code } = event;
  if (Reflect.has(keyCache, code)) {
    event.preventDefault();
    keyCache[code] = false;
  }
};
const checkState = () => {
  if (calcDistance().distance < checkSize.value*2) {
    isWin.value = true;
    togglePlay();
  }
};
const moveListener = () => {
  if (isPlay.value) {
    const { clientWidth, clientHeight } = container.value;
    if (keyCache.ArrowUp) listenerLoc.value.y = Math.max(listenerLoc.value.y - 1, checkSize.value*2);
    if (keyCache.ArrowDown)
      listenerLoc.value.y = Math.min(listenerLoc.value.y + 1, clientHeight - checkSize.value*2);
    if (keyCache.ArrowLeft) listenerLoc.value.x = Math.max(listenerLoc.value.x - 1, checkSize.value*2);
    if (keyCache.ArrowRight)
      listenerLoc.value.x = Math.min(listenerLoc.value.x + 1, clientWidth - checkSize.value*2);
  }

  moveTimerId = requestAnimationFrame(moveListener);
};
const calcDistance = () => {
  let distance = Math.sqrt(
    Math.pow(targetLoc.value.x - listenerLoc.value.x, 2) +
      Math.pow(targetLoc.value.y - listenerLoc.value.y, 2)
  );
  let res = {
    distance,
    rate: 1,
  };
  switch (true) {
    case distance > 200:
      res.rate = 1.4;
      break;
    case distance > 150:
      res.rate = 1.2;
      break;
    case distance > 100:
      res.rate = 1;
      break;
    case distance > 50:
      res.rate = 0.75;
      break;
    case distance > 20:
      res.rate = 0.6;
      break;
    case distance > 10:
      res.rate = 0.4;
      break;
    default:
      res.rate = 0.3;
  }
  console.log("res", res);
  return res;
};
const togglePlay = () => {
  if (!audioCtx || !oscillator || !panner || !listener || !gainNode) return;
  isPlay.value = !isPlay.value;
  if (!isInit) {
    initAudio();
    isInit = true;
  }
  if (isPlay.value) {
    isWin.value = false;
    setRandomLoc();
    panner.connect(audioCtx.destination);
    makeSound();
  } else {
    panner.disconnect(audioCtx.destination);
  }
};
</script>
<style lang="scss" scoped>
.plaid {
  background-image: linear-gradient(90deg, var(--main-color) 10%, transparent 10%),
    linear-gradient(var(--main-color) 10%, transparent 10%);
  background-size: 10px 10px;
  background-position: -0.5px -0.5px;
}
</style>
