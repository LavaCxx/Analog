<template lang="pug">
.flex.gap-x-1
    FlipItem(v-for="(item, index) in displayList" :key="item[0]" :value="[letterList[item],item===targetList[index]?letterList[item]:letterList[item===letterLength-1?0:item+1]]" :duration="duration")
</template>

<script lang="ts" setup>
interface Props{
    value:string,
    duration?:number,
    num:number
}
const props=defineProps<Props>();

const letterList=[' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const letterLength=letterList.length
const duration=ref(props.duration||600)
const displayList=ref<number[]>(new Array(props.num||3).fill(0))
let targetList=props.value.split('').map(v=>letterList.findIndex(letter=>letter===v.toUpperCase()))
    if(targetList.length<props.num){
        targetList=[...new Array(props.num-targetList.length).fill(0),...targetList]
    }
// 数组对比
const compareArray=(a:number[],b:number[])=>{
    let changeList:number[]=[]
    for(let i=0;i<a.length;i++){
        if(a[i]!==b[i]) changeList.push(i)
    }
    if(changeList.length>0) changeDisplay(changeList)
}
const changeDisplay=(list:number[])=>{
    for(let i=0;i<list.length;i++){
        displayList.value[list[i]]=displayList.value[list[i]]===letterLength-1?0:displayList.value[list[i]]+1
    }
}
watch(()=>props.value, (newVal)=>{
    targetList=newVal.split('').map(v=>letterList.findIndex(letter=>letter===v.toUpperCase()))
    if(targetList.length<props.num){
        targetList=[...new Array(props.num-targetList.length).fill(0),...targetList]
    }
})
onMounted(()=>{
    setInterval(()=>{
        compareArray(targetList,displayList.value)
    },duration.value)
})
</script>