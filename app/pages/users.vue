<script setup lang="ts">
import { hydrateOnVisible, ref } from "vue";
//import UProgress from "@nuxt/ui";

import { useMediaQuery } from "@vueuse/core";

const AsyncUsersData = defineAsyncComponent({
  loader: () => import("../../components/users/UsersData.vue"),
  delay: 300,
  hydrate: hydrateOnVisible(),
});

const AsyncUsersList = defineAsyncComponent({
  loader: () => import("../../components/users/usersList.vue"),
  delay: 100,
  hydrate: hydrateOnVisible(),
});

const isMobile = useMediaQuery("(width < 768.5px)", { ssrWidth: 768 });
const load = ref(null);
//const load1 = ref(null);
</script>

<template>
  <div class="p-4 w-full">
    <div class="flex flex-col md:flex-row gap-2 md:items-start">
      <KeepAlive>
        <Suspense>
          <AsyncUsersList
            class="h-full min-h-[44vh] w-full md:min-h-[35vh] md:w-[20vw]"
          />
          <template #fallback>
            <UProgress
              v-model="load"
              color="neutral"
              size="md"
              :max="['Загрузка данных...']"
            />
          </template>
        </Suspense>
      </KeepAlive>
      <USeparator
        :orientation="isMobile ? 'horizontal' : 'vertical'"
        color="neutral"
        type="solid"
        icon="i-simple-icons-nuxtdotjs"
        :class="isMobile ? 'h-[2vh] w-full min-w-xs' : 'min-h-[92vh]'"
        :ui="{ border: 'border-1 dark:border-slate-600' }"
      />

      <KeepAlive>
        <Suspense>
          <AsyncUsersData
            class="mt-1 w-full min-w-[94vw] md:min-w-[70vw] lg:min-w-[50vw] lg:mt-0"
          />
          <template #fallback>
            <UProgress
              v-model="load"
              color="neutral"
              size="md"
              :max="['Получение данных...']"
            />
          </template>
        </Suspense>
      </KeepAlive>
    </div>
  </div>
</template>
