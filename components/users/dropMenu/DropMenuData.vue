<script setup lang="ts">
import type { DropdownMenuItem, BreadcrumbItem } from "@nuxt/ui";
import { useState } from "nuxt/app";
import { computed, ref, onMounted, watch } from "vue";
import type { IUserData } from "../../../types/user";

const showTodo = ref<boolean>(false);
const showAlboms = ref<boolean>(false);
const user = useState<IUserData>("currentUser");

const nameSlot = computed(() =>
  showTodo.value ? "usertasks" : showAlboms.value ? "useralboms" : ""
);

const breadItems = ref([
  { label: "Пользователь", icon: "i-lucide-user" },
  {
    label: "Данные",
    icon: "i-lucide-database",
  },
  {
    slot: "dropdown" as const,
    // icon: "i-lucide-folder-open-dot",
    children: [
      {
        label: user.value.label,
        icon: "i-lucide-app-window",
        type: "label" as const,
        class: " text-xs",
      },
      {
        label: "Задачи",
        icon: "i-lucide-list-check",
        type: "checkbox" as const,
        checked: showTodo.value,
        class: "cursor-pointer",
        onUpdateChecked(checked: boolean) {
          showTodo.value = checked;
          showAlboms.value = false;
          addBreadItem();
        },
        onSelect(evt: Event) {
          //evt.preventDefault();
        },
        slot: "",
      },
      { type: "separator" as const },
      {
        label: "Альбомы",
        icon: "i-lucide-file-music",
        type: "checkbox" as const,
        checked: showAlboms.value,
        onUpdateChecked(checked: boolean) {
          showAlboms.value = checked;
          showTodo.value = false;
          addBreadItem();
        },
        onSelect(evt: Event) {
          //evt.preventDefault();
        },
        class: "cursor-pointer",
        slot: "",
      },
    ] satisfies DropdownMenuItem[],
  },
] satisfies BreadcrumbItem);

// const menuItems = computed(
//   () =>
//     [
//       {
//         label: "Данные пользователя",
//         icon: "i-lucide-app-window",
//         type: "label" as const,
//       },
//       { type: "separator" as const },
//       {
//         label: "Задачи",
//         icon: "i-lucide-list",
//         type: "checkbox" as const,
//         checked: showTodo.value,
//         onUpdateChecked(checked: boolean) {
//           showTodo.value = checked;
//           showAlboms.value = false;
//         },
//         onSelect(evt: Event) {
//           //evt.preventDefault();
//         },
//         class: "cursor-pointer",
//         slot: "",
//       },
//       {
//         label: "Альбомы",
//         icon: "i-lucide-download",
//         type: "checkbox" as const,
//         checked: showAlboms.value,
//         onUpdateChecked(checked: boolean) {
//           showAlboms.value = checked;
//           showTodo.value = false;
//         },
//         onSelect(evt: Event) {
//           //evt.preventDefault();
//         },
//         class: "cursor-pointer",
//         slot: "",
//       },
//     ] satisfies DropdownMenuItem[]
// );

const addBreadItem = () => {
  if (breadItems.value.length > 3) {
    breadItems.value.pop();
  }

  if (nameSlot.value === "usertasks") {
    breadItems.value.push({
      label: "Задачи",
      icon: "",
      //icon: "i-lucide-list-check",
    });
    return;
  }
  if (nameSlot.value === "useralboms") {
    breadItems.value.push({
      label: "Альбомы",
      icon: "",
      // icon: "i-lucide-file-music",
    });

    return;
  }
};

onMounted(() => {
  showTodo.value = true;
  addBreadItem();
});

watch(
  user,
  () => {
    //@ts-ignore
    breadItems.value[2].children[0].label = user.value.label;
  },
  { deep: true }
);
</script>

<template>
  <UBreadcrumb
    :items="breadItems"
    :separator-icon="'i-lucide-arrow-right'"
    class="ml-1 text-xs lg:text-sm py-1 mb-1"
  >
    <template #item-label="{ item, active }">
      <span
        v-if="active"
        class="text-xs lg:text-sm flex items-center justify-center gap-1 text-neutral-600"
      >
        <UIcon
          :name="
            nameSlot === 'usertasks'
              ? 'i-lucide-list-check'
              : 'i-lucide-file-music'
          "
          class="size-10"
        />
        {{ item.label }}
      </span>
    </template>
    <template #dropdown="{ item }">
      <UDropdownMenu
        :items="item.children"
        :content="{ align: 'start', side: 'bottom', sideOffset: 4 }"
        :ui="{ content: 'w-50' }"
      >
        <UButton
          label=""
          color="neutral"
          variant="link"
          icon="i-lucide-ellipsis"
          size="xl"
          class="p-0.5"
          title="Нажмите для выбора"
        />
      </UDropdownMenu>
    </template>
  </UBreadcrumb>
  <USeparator
    color="neutral"
    :ui="{ border: 'border-1 dark:border-slate-600' }"
  />
  <slot :name="nameSlot" class="mt-2"></slot>
</template>
