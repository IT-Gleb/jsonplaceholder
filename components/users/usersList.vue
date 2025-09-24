<script setup lang="ts">
import { onMounted, watch, ref, nextTick } from "vue";
import { useUsers } from "../../controllers/usersController";
import type { IUserData, TUserData } from "../../types/user";
import { useState } from "nuxt/app";
import { useUserDataComposable } from "../../app/composables/useUserData";
//import { useToast } from "@nuxt/ui/";

//type TUserToTable = Pick<IUser, "id" | "name" | "email" | "username">;

const load = ref(null);
const user = useState<IUserData>("currentUser");
const GlobalUserData = useState<TUserData>("currentUserData");

const usersGroup = ref([
  {
    id: "users",
    label: "Пользователи",
    // highlightedIcon: "i-lucide-user-check",
    items: [] satisfies IUserData[],
  },
]);

//@ts-ignore
const toast = useToast();

const toastInfoRefreshData = (props: {
  header: string;
  description: string;
  color:
    | "error"
    | "success"
    | "info"
    | "neutral"
    | "primary"
    | "secondary"
    | "warning";
}) => {
  toast.add({
    title: props.header,
    description: props.description,
    icon: "i-lucide-book-alert",
    color: props.color,
    progress: true,
  });
};

//Получить данные по пользователям
const { status, data, refresh, clear, error } = useUsers();
//Получить данные по пользователю
const userId = ref<string | number>(1);
const { statusUserData, usersData, usersDataClear, usersDataRefresh } =
  useUserDataComposable(userId);

onMounted(async () => {
  await refresh();
  if (status.value === "success") {
    toastInfoRefreshData({
      header: "Сообщение",
      description: "Данные успешно обновлены...",
      color: "success",
    });
  }
  if (error.value) {
    toastInfoRefreshData({
      header: "Ошибка",
      description: "Что-то пошло не так...",
      color: "error",
    });
  }
});

const handlerRefresh = async (event: Event) => {
  clear();
  await refresh();
  if (status.value === "success") {
    toastInfoRefreshData({
      header: "Сообщение",
      description: "Данные успешно обновлены...",
      color: "success",
    });
  }
  if (error.value) {
    toastInfoRefreshData({
      header: "Ошибка",
      description: "Что-то пошло не так...",
      color: "error",
    });
  }
};

watch(
  data,
  () => {
    if (data.value?.users && data.value.users.length > 0) {
      usersGroup.value[0]?.items.splice(0, 100);
      data.value.users.map((item) => {
        const tmp = {
          label: `${item.username}_${item.name}`,
          icon: "i-lucide-circle-user-round",
          userdata: item,
          onSelect() {
            //console.log(this.userdata);
            user.value = this as IUserData;
          },
        };

        usersGroup.value[0]?.items.push(tmp as never);
      });

      //Выделить первый
      nextTick(() => {
        user.value = usersGroup.value[0]?.items[0] as unknown as IUserData;
      });
    }
  },
  { deep: true }
);

watch(
  user,
  async () => {
    userId.value = user.value.userdata.id;
    usersDataClear();
    await usersDataRefresh();
    await nextTick(() => {
      GlobalUserData.value = usersData.value as TUserData;
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 flex-row">
      <UButton
        icon="i-lucide-rocket"
        color="neutral"
        size="lg"
        @click="handlerRefresh"
        >Обновить</UButton
      >

      <UProgress
        v-if="status === 'pending' || statusUserData === 'pending'"
        v-model="load"
        color="neutral"
        size="md"
        :max="['Получение данных...']"
      />
    </div>
    <div class="w-full">
      <UCommandPalette
        placeholder="Поиск и фильтрация"
        class="flex-0 h-120 mt-5"
        v-model="user"
        :groups="usersGroup"
        selected-icon="i-lucide-user-check"
        selection-behavior="replace"
        :highlight-on-hover="true"
        :multiple="false"
      >
        <template #item-label="{ item }">
          <span
            v-if="item.label === user.label"
            class="inline-block text-black dark:text-slate-200 text-sm font-semibold w-[260px] truncate text-left underline underline-offset-2"
          >
            {{ item.label }}
          </span>
          <span v-else class="text-muted">
            {{ item.label }}
          </span>
        </template>
      </UCommandPalette>
    </div>
  </div>
</template>
