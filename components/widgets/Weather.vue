<template lang="pug">
.flex.items-center.gap-x-1.text-main
  <!-- .text-6xl(v-for="icon in icons" :key="icon" v-show="icon===weatherData.icon" :class="icon") -->
  .text-4xl(:class="weatherData.icon")
  .flex.flex-col
    .text-xl {{weatherData.temp}}°C
    .text-xl {{weatherData.location}} {{weatherData.weather}}
</template>
<script lang="ts" setup>
const weatherData=ref({
  temp:0,
  weather:'',
  location:'',
  code:'',
  icon:''
})
const weatherIcons={
  'qing':'i-mdi-white-balance-sunny',
  'yin':'i-mdi-weather-partly-cloudy',
  'lei':'i-mdi-weather-lightning',
  'shachen':'i-mdi-weather-dust',
  'wu':'i-mdi-weather-fog',
  'bingbao':'i-mdi-weather-hail',
  'yun':'i-mdi-weather-cloudy',
  'yu':'i-mdi-weather-rainy',
}
const getWeatherData=async()=> {
  const {week,city,wea,wea_img,tem}=await $fetch('https://v0.yiketianqi.com/api?appid=84429454&appsecret=1wtaJnSw&version=v61', {
    method: 'GET'
  })
  weatherData.value={
    temp:tem,
    location:city,
    icon:weatherIcons[wea_img],
    weather:wea
  }

}
onMounted(()=>{
  getWeatherData()
})
</script>
