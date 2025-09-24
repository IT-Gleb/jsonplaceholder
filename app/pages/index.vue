<script setup lang="ts">
useHead({
  title: "Главная",
  meta: [{ name: "author", content: "Gleb Torgashin" }],
});
</script>

<template>
  <UContainer class="mt-5 p-1 mx-6">
    <h2 class="text-xl lg:text-3xl font-semibold uppercase">
      Главная страница
    </h2>
    <h4 class="my-5 uppercase font-bold">
      Используемые библиотеки, API и фреймворки:
    </h4>
    <ol
      class="list-decimal p-1 w-fit [&>li]:marker:font-bold [&>li]:marker:font-['Inter'] [&>li]:marker:text-xs [&>li]:place-content-center [&>li]:p-1 [&>li]:even:bg-neutral-100 [&>li]:even:dark:bg-neutral-800/60"
    >
      <li>Nuxt 4.1.2</li>
      <li>Vue 3.5.21</li>
      <li>Vue-router 4.5.1</li>
      <li>Tailwindcss 4.1.13</li>
      <li>Nuxt UI 3.3.5</li>
      <li>Vueuse 13.9.0</li>
      <li>Nuxt Image 1.11.0</li>
      <li>Nuxt Fonts 0.11.4</li>
      <li>Nuxt Icon 2.0.0</li>
      <li>Iconify Json Lucide 1.2.68</li>
      <li>
        API&nbsp;
        <NuxtLink
          to="https://jsonplaceholder.typicode.com/"
          target="_blank"
          prefetch-on="interaction"
          class="underline underline-offset-2"
          >JsonPlaceholder</NuxtLink
        >
      </li>
    </ol>
  </UContainer>
</template>
