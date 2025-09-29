<script setup lang="ts">
import { useState } from "nuxt/app";
import { ref } from "vue";
import type { IUserData } from "../../types/user";

const AsyncMobileUsersList = defineAsyncComponent({
  loader: () => import("./usersList.vue"),
});

const load = ref(null);

const currUser = useState<IUserData>("currentUser");

const buttonLabel = ref<string>(
  currUser.value.userdata
    ? currUser.value.userdata.username + "_" + currUser.value.userdata.name
    : "Выбрать пользователя"
);
const drawerOpen = ref<boolean>(false);

watch(
  currUser,
  () => {
    if (currUser.value.userdata) {
      buttonLabel.value =
        currUser.value.userdata.username + "_" + currUser.value.userdata.name;
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <UButton
      :label="buttonLabel"
      color="neutral"
      size="xl"
      icon="i-lucide-users"
      @click="drawerOpen = true"
      class="text-sm"
    />

    <UDrawer
      direction="left"
      v-model:open="drawerOpen"
      :dismissible="false"
      :handle="false"
      :ui="{ header: 'text-sm flex items-center justify-between min-w-[75vw]' }"
    >
      <template #header>
        <h4 class="font-bold font-['Inter'] uppercase p-1">
          Список Пользователей
        </h4>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="drawerOpen = false"
          class="mr-1"
        />
      </template>

      <template #body>
        <div class="flex flex-col">
          <KeepAlive>
            <Suspense>
              <AsyncMobileUsersList />

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
          <UButton
            label="Закрыть"
            @click="drawerOpen = false"
            color="neutral"
            size="lg"
            icon="i-lucide-x"
            class="mx-auto"
          />
        </div>
      </template>
    </UDrawer>
  </div>
</template>
