import {createEffect, createSignal,Index, onMount} from 'solid-js'
import FlipItem from './FlipItem'
interface Props {
    value: string,
    length?:number,
    flipType?:string
    duration?:number,
    id?:string
}
export default (props: Props) => {
    const letterList = ['', ...new Array(26).fill(0).map((_, i) => String.fromCharCode(65 + i)), ...new Array(10).fill(0).map((_, i) => i.toString())]
    const letterLen=letterList.length

    const duration=props.duration||100
    const displayLen=props.length||8
    let targetList=props.value.split('').map(v=>letterList.findIndex(letter=>letter===v.toUpperCase()))
    if(targetList.length<displayLen){
        targetList.unshift(...new Array(displayLen-targetList.length).fill(0))
    }
    console.log('targetList',targetList)
    const [displayList,setDisplayList]=createSignal<number[]>(new Array(displayLen).fill(0))
    const compareArrays=(a:number[],b:number[])=>{
        let changeList:number[]=[]
        for(let i=0;i<a.length;i++){
            if(a[i]!==b[i]){
                changeList.push(i)
            }
        }
        if(changeList.length===0) return
        changeDisplay(changeList)
    }

    const changeDisplay=(list:number[])=>{
        setDisplayList((prev)=>{
            let temp=[...prev]
            for(let i=0;i<list.length;i++){
                temp[list[i]]=temp[list[i]]===letterLen-1?0:temp[list[i]]+1
            }
            return temp
        })
    }
    onMount(()=>{
       setInterval(()=>{
            compareArrays(displayList(),targetList)
            // console.log(childRefs)
        },duration)
    })
    createEffect(()=>{
        console.log(props.value)
    })
    return (
        <div class="flex gap-x-0.5">
            <Index each={displayList()} >
                {
                    (item,i)=>(
                        <FlipItem  duration={duration} value={[letterList[item()],item()===targetList[i]?letterList[item()]:letterList[item()===letterLen-1?0:item()+1]]} />
                    )
                }
            </Index>
        </div>
    )
}