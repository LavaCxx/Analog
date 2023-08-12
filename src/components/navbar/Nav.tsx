
import {For} from 'solid-js'
import { A } from "@solidjs/router"; // 👈 Import the A component
interface NavItem {
    title: string;
    link: string;
}
interface Props {
    list:Array<NavItem>,
    change:(val:string)=>void
}
export default (props:Props) => {

    return (
        <div class="flex flex-col justify-center">
            <For each={props.list}>{(item) => (
                <A on-click={props.change} class="font-bold text-main text-xl" href={item.link}>{item.title}</A>
            )}</For>
        </div>
    )
};
