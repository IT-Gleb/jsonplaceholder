<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { IUserData } from "../../types/user";
import { defineAsyncComponent, ref, watch, onMounted } from "vue";
import { useState } from "nuxt/app";
import { useMediaQuery } from "@vueuse/core";
import type { BreadcrumbItem } from "@nuxt/ui";
import LazyUsersDataItem from "./UsersDataItem.vue";

const AsyncUserDataValues = defineAsyncComponent(
  () => import("./UserDataValues.vue")
);

const AsyncDropMenuData = defineAsyncComponent({
  loader: () => import("./dropMenu/DropMenuData.vue"),
  delay: 300,
});

const AsyncUserDataAlboms = defineAsyncComponent({
  loader: () => import("./UseraDataAlboms.vue"),
});

const pg = ref(null);

const userData = useState<Partial<IUserData>>("currentUser", () => ({}));
const isMobile = useMediaQuery("(width < 768.5px)", { ssrWidth: 768 });

const activeTab = ref();

const tabs = ref<TabsItem[]>([
  {
    label: "Пользователь",
    icon: "i-lucide-user",
  },
  {
    label: "Адрес",
    icon: "i-lucide-map",
  },
  {
    label: "Организация",
    icon: "i-lucide-home",
  },
  { label: "Данные", icon: "i-lucide-list-todo", slot: "tasks" as const },
]);

const breadCrumbs = ref([{ label: "", icon: "" }] satisfies BreadcrumbItem[]);

watch(
  userData,
  () => {
    if (userData.value && tabs.value.length > 0) {
      //console.log(userData.value);
      tabs.value[0] !== undefined
        ? (tabs.value[0].data = {
            id: { label: "Идентификатор", value: userData.value.userdata?.id },
            username: {
              label: "Имя",
              value: userData.value.userdata?.username,
            },
            name: { label: "Второе имя", value: userData.value.userdata?.name },
            website: { label: "Сайт", value: userData.value.userdata?.website },
            phone: { label: "Телефон", value: userData.value.userdata?.phone },
            email: {
              label: "Эл. почта",
              value: userData.value.userdata?.email,
            },
          })
        : undefined;
      tabs.value[1] !== undefined
        ? (tabs.value[1].data = {
            city: {
              label: "Город",
              value: userData.value.userdata?.address.city,
            },
            street: {
              label: "Улица",
              value: userData.value.userdata?.address.street,
            },
            suite: {
              label: "Дом",
              value: userData.value.userdata?.address.suite,
            },
            zipCode: {
              label: "Почтовый код",
              value: userData.value.userdata?.address.zipcode,
            },
            geo: {
              label: "Геоположение",
              value: userData.value.userdata?.address.geo,
            },
          })
        : undefined;
      tabs.value[2] !== undefined
        ? (tabs.value[2].data = {
            companyName: {
              label: "Организация",
              value: userData.value.userdata?.company.name,
            },
            bs: { label: "Бс", value: userData.value.userdata?.company.bs },
            phrase: {
              label: "Описание",
              value: userData.value.userdata?.company.catchPhrase,
            },
          })
        : undefined;
    }
  },
  { deep: true }
);

onMounted(() => {
  if (breadCrumbs.value[0]) {
    breadCrumbs.value[0].label = tabs.value[0]?.label as string;
    breadCrumbs.value[0].icon = tabs.value[0]?.icon as string;
  }
});

watch(
  activeTab,
  () => {
    let index: number = activeTab.value as number;
    //@ts-ignore
    breadCrumbs.value = tabs.value
      .map((item, ind) => {
        if (ind <= index) {
          return {
            label: item.label as string,
            icon: item.icon as string,
          };
        }
      })
      .filter((item) => item !== undefined);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <UTabs
      color="neutral"
      :items="tabs"
      class="text-sm lg:text-md flex flex-col items-start justify-items-start"
      :orientation="isMobile ? 'vertical' : 'horizontal'"
      v-model="activeTab"
    >
      <template #content="{ item }">
        <section class="mt-1 min-h-[30dvh]">
          <UBreadcrumb
            :items="breadCrumbs"
            separator-icon="i-lucide-arrow-right"
            class="m2-1 mb-3 text-xs lg:text-sm"
            color="info"
          >
            <template #item="{ item, active }">
              <div
                class="flex flex-row gap-2 items-center text-xs lg:text-sm"
                :class="active ? 'text-info' : 'text-muted'"
              >
                <UIcon :name="item.icon" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </UBreadcrumb>
          <USeparator
            color="neutral"
            :ui="{ border: ' border-1 dark:border-slate-600' }"
            class="mb-2"
          />
          <div
            v-if="item.data"
            v-for="key in Object.keys(item.data)"
            :key="key"
            class="odd:bg-neutral-200 odd:dark:bg-slate-600"
          >
            <LazyUsersDataItem
              :prop-key="item.data[key].label"
              :prop-value="item.data[key].value"
              hydrite-on-visible
            />
          </div>
        </section>
      </template>
      <template #tasks="{ item }">
        <section class="min-h-[30dvh]">
          <KeepAlive>
            <Suspense>
              <template #fallback>
                <UProgress color="neutral" v-model="pg" size="md" />
              </template>
              <AsyncDropMenuData>
                <template #useralboms>
                  <AsyncUserDataAlboms />
                </template>
                <template #usertasks>
                  <AsyncUserDataValues />
                </template>
              </AsyncDropMenuData>
            </Suspense>
          </KeepAlive>
        </section>
      </template>
    </UTabs>
  </div>
</template>

<!-- <AsyncUserDataValues /> -->
