import { createEffect, createMemo, createSignal,onMount,untrack} from "solid-js"
import styles from './Flap.module.css'
interface Props {
    defaultValue?:string[],
    value:string[],
    duration:number,
}

export default (props: Props) => {
    const [isFlip,setIsFlip]=createSignal(false)
    const [currentVal,setCurrentVal]=createSignal(props.value)
    let queue:string[][]=[]
    const flip=()=>{
            if(isFlip()||queue.length===0){
                return
            } 
            let val=queue.shift()
            if(!val||val[0]===val[1]) return
            setCurrentVal(val)
            setIsFlip(()=>true)
            setTimeout(()=>{
                setIsFlip(()=>false)
                setCurrentVal((perv)=>{
                    let temp=[...perv]
                    temp[0]=temp[1]
                    return temp
                })
            },props.duration)

    }
    createEffect(()=>{
        queue.push(props.value)
        // untrack(()=>flip(val))
        // flip(val)
    })
    onMount(()=>{
        setInterval(()=>{
            flip()
        },props.duration)
    })
    return (
        <div class={`${styles.flipItem} ${styles.down} ${isFlip()?styles.go:''}`} style={'--duration:'+props.duration+'ms'}>
            <div class={`${styles.card} ${styles.front}`} attr-str={currentVal()[0]}></div>
            <div class={`${styles.card} ${styles.back}`}attr-str={currentVal()[1]}></div>
        </div>
    )
}