<template lang="pug">
.flex.flex-col.items-center.text-center.gap-x-2.select-none.relative.cursor-pointer(@click="toggleTheme")
    .w-20.text-main.border-2.border-sub.px-2 {{isDark?'Dark':'Light'}}
    //- .test
</template>

<script lang="ts" setup>
const isDark = ref(false);
const themeMenu = ref(["Light", "Auto", "Dark"]);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  let transition;
  // @ts-ignore
  if (!document.startViewTransition) {
    toggleClass()
    return;
  }
  // @ts-ignore
  transition = document.startViewTransition(() => {
    toggleClass()
  });
  transition.ready.then(() => {
    const clipPath = [`inset(0% 0% 100% 0%)`, `inset(0% 0% 0% 0%)`];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: "cubic-bezier(.34,1,.38,1.63)",
        pseudoElement: isDark.value
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      }
    );
  });
};
const toggleClass=()=>{
  document.documentElement.classList[isDark.value ? 'add' : 'remove']('dark')
  document.body.classList[isDark.value ? 'add' : 'remove']('dark')
}
</script>
<style is:global>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  .dark::view-transition-old(root) {
    z-index: 1;
  }
  .dark::view-transition-new(root) {
    z-index: 999;
  }

  ::view-transition-old(root) {
    z-index: 999;
  }
  ::view-transition-new(root) {
    z-index: 1;
    animation-duration: 20s !important;
  }
</style>
