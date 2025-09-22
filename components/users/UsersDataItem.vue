<script setup lang="ts">
const props = defineProps<{ propKey: string; propValue: string }>();
</script>

<template>
  <div
    class="text-xs md:text-sm grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] gap-4 items-start place-content-center"
  >
    <span class="inline-block p-1 font-bold text-muted">
      {{ props.propKey }}
    </span>
    <span
      class="inline-block p-1 border-l-2 border-l-neutral-300 dark:border-l-neutral-500"
    >
      {{ props.propValue }}
    </span>
  </div>
</template>
