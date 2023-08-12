import { getCollection } from 'astro:content';
import { For, onMount, createSignal } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import ArticleItem from './ArticleItem';

export default () => {
  const [posts, setPosts] = createSignal<CollectionEntry<'blog'>[]>([]);

  onMount(async () => {
    const articles = (await getCollection('blog')).sort(
      (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
    );
    setPosts(()=>articles);
    console.log('posts',posts())
  });

  return (
    <div class="w-full h-screen overflow-y-auto">
      <For each={posts()}>
        {(post) => (
          <ArticleItem {...post} />
        )}
      </For>
    </div>
  );
};
