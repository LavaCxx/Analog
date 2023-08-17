<template lang="pug">
.p-0
    FlipItem(v-for="(item, index) in displayList" :key="index" :value="[letterList[item],item===targetList[i]?letterList[item]:letterList[item===letterLength-1?0:item+1]]" :duration="duration")
</template>

<script lang="ts" setup>
interface Props{
    value:string,
    duration?:number
}
const props=defineProps<Props>();

const letterList=[' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
const letterLength=letterList.length
const duration=ref(props.duration||600)
const displayList=ref<number[]>(new Array(props.value.length).fill(0))
let targetList=props.value.split('').map(v=>letterList.findIndex(letter=>letter===v.toUpperCase()))
// 数组对比
const compareArray=(a:number[],b:number[])=>{
    let changeList:number[]=[]
    for(let i=0;i<a.length;i++){
        if(a[i]!==b[i]) changeList.push(i)
    }
    if(changeList.length>0) changeDisplay(changeList)
}
const changeDisplay=(list:number[])=>{
    let temp=[...displayList.value]
    for(let i=0;i<list.length;i++){
        temp[list[i]]=temp[list[i]]===letterLength-1?0:temp[list[i]]+1
    }
    displayList.value=temp
}
onMounted(()=>{
    setInterval(()=>{
        compareArray(displayList.value,targetList)
    })
})
</script>