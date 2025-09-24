<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <section class="my-10 w-fit mx-auto">
    <h1 class="text-2xl font-bold text-error">{{ props.error?.statusCode }}</h1>
    <p class="my-5 text-sm">Ошибка: {{ props.error?.message }}</p>
    <NuxtLink to="/" class="my-10 underline underline-offset-2">
      На Главную</NuxtLink
    >
  </section>
</template>
