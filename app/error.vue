<script setup lang="ts">
import type { NuxtError } from "#app";
import { getNowYear } from "~~/utils/functions";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div
    class="h-full min-h-screen w-full overflow-x-hidden text-neutral-900 dark:text-neutral-50 flex flex-col items-start"
  >
    <header class="w-full bg-rose-500 min-h-10 p-1"></header>
    <main class="p-4 flex-1 w-fit mx-auto">
      <section class="my-10">
        <h1 class="text-2xl font-bold text-error">
          {{ props.error?.statusCode }}
        </h1>
        <p class="my-5 text-sm">Ошибка: {{ props.error?.message }}</p>
        <NuxtLink to="/" class="my-10 underline underline-offset-2">
          На Главную</NuxtLink
        >
      </section>
    </main>
    <footer class="w-full bg-rose-500 min-h-10 text-center text-neutral-50 p-1">
      by Gleb Torgashin &copy; 2000-{{ getNowYear() }}
    </footer>
  </div>
</template>
