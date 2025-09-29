<script setup lang="ts">
const messages: string[] = Array.from(
  { length: 20 },
  (item) => " <<NUXT UI компоненты>> "
);
</script>

<template>
  <div
    class="bg-neutral-100 dark:bg-neutral-700 text-indigo-950 dark:text-indigo-200 w-full overflow-hidden"
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
  animation: startLine 10s linear infinite alternate-reverse,
    marquee 10s linear infinite;
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
