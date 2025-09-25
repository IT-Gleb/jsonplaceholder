<script setup lang="ts">
const messages: string[] = [
  "Nuxt - замечательный фреймворк.",
  "Vue js- отличный фреймворк для frontend.",
  "Nuxt - замечательный фреймворк.",
  "Vue js- отличный фреймворк для frontend.",
  "Nuxt - замечательный фреймворк.",
  "Vue js- отличный фреймворк для frontend.",
  "Nuxt - замечательный фреймворк.",
  "Vue js- отличный фреймворк для frontend.",
];
</script>

<template>
  <div
    class="bg-yellow-200 dark:bg-slate-200 text-indigo-950 w-full overflow-hidden"
  >
    <div
      class="max-w-[3000px] flex flex-row gap-1 py-1 whitespace-nowrap lineAnimate font-mono"
    >
      <span
        v-for="value in messages"
        :key="value"
        class="block place-content-center transition-all"
      >
        {{ value }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.lineAnimate {
  animation: startLine 10s linear infinite, marquee 10s linear infinite;
}

@keyframes startLine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
