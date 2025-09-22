<script setup lang="ts">
// import type { ToastProps } from "@nuxt/ui";
import { ref } from "vue";
import { useNuxtApp } from "#app";

const toaster = { position: "bottom-left" as const, duration: 4000 };
const pvalue = ref(null);
const progressShow = ref<boolean>(true);
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:loading:start", () => {
  // console.log("page start");
  progressShow.value = true;
});
nuxtApp.hook("page:loading:end", () => {
  // console.log("page end");
  progressShow.value = false;
});
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <UProgress
        v-if="progressShow"
        v-model="pvalue"
        color="neutral"
        size="sm"
        :max="['Идет загрузка...']"
      />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
