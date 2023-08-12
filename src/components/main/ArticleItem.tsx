
import type { CollectionEntry } from 'astro:content';
import dayjs from 'dayjs';
type Props = CollectionEntry<'blog'>;
export default(props:Props)=>{
    const {slug, data:{description,pubDate}} = props
    return (
        <div class="p-6">
            <h3 class="text-xl">{slug}</h3>
            <p>{description}</p>
            <div>
                <span>{dayjs(pubDate).format('YYYY-MM-DD')}</span>
            </div>
        </div>
    )
}