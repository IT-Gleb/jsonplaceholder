<script setup lang="ts">
import { useState } from "nuxt/app";
//import { useUserData } from "../../controllers/userDataController";
import {
  onMounted,
  ref,
  watch,
  useTemplateRef,
  h,
  resolveComponent,
} from "vue";
import type { IUserData, TUserData } from "../../types/user";
import type { TableColumn, TableRow } from "@nuxt/ui";
//import { useToast } from "@nuxt/ui/runtime/composables/useToast.js";

//const toast = useToast();

const currUser = useState<IUserData>("currentUser");
const GlobalUserData = useState<TUserData>("currentUserData");

//const paramId = ref<string | number>(currUser.value.userdata.id ?? "1");

const RowSelectedLength = ref<number>(0);

//const { status, data, error, clear, execute, refresh } = useUserData(paramId);

const UCheckB = resolveComponent("UCheckbox");
const UBadge = resolveComponent("UBadge");

type TColumnTodo = {
  title: string;
  completed: boolean;
};
const columns: TableColumn<TColumnTodo>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return h(UCheckB, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") => {
          // console.log(value, !!value);
          if (GlobalUserData.value) {
            GlobalUserData.value.userdata.todos = [
              ...GlobalUserData.value.userdata.todos,
            ].map((item) => ({ ...item, completed: !!value }));
          }
          table.toggleAllPageRowsSelected(!!value);
        },
        "aria-label": "Select all",
        color: "neutral",
      });
    },
    cell: ({ row }) =>
      h(UCheckB, {
        // modelValue: row.getIsSelected(),
        modelValue: row.getValue("completed") || row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") => {
          row.toggleSelected(!!value);
          chandeCompleted(row as TableRow<TColumnTodo>);
        },
        "aria-label": "Select row",
        color: "neutral",
      }),
    enableSorting: false,
    enableHiding: false,
    meta: {
      class: {
        th: "bg-neutral-50 dark:bg-neutral-800 text-center",
        td: "text-center cursor-pointer dark:border-t dark:border-t-slate-600",
      },
    },
  },
  {
    accessorKey: "title",
    header: ({ table }) =>
      h("div", { class: "text-left uppercase text-sm" }, "Задача"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "pl-2 first-letter:uppercase" },
        `${row.getValue("title")}`
      );
    },
    meta: {
      class: {
        th: "bg-neutral-50 dark:bg-neutral-800",
        td: "text-sm lg:text-lg dark:border-t dark:border-t-slate-600 ",
      },
    },
  },
  {
    accessorKey: "completed",
    header: ({ table }) =>
      h("div", { class: "p-1 text-left uppercase text-sm" }, "Статус"),
    cell: ({ row }) => {
      const color = {
        true: "success" as const,
        false: "neutral" as const,
      }[row.getValue("completed") as string];

      row.toggleSelected(row.getValue("completed"));

      return h(
        UBadge,
        {
          class: "capitalize text-xs",
          variant: "subtle",
          color,
          size: "xl",
          label: (row.getValue("completed") as boolean) ? "ok" : "нет",
          icon: (row.getValue("completed") as boolean)
            ? "i-lucide-badge-check"
            : "i-lucide-file-x",
        },
        () => row.getValue("completed")
      );
    },
    meta: {
      class: {
        th: "bg-neutral-50 dark:bg-neutral-800",
        td: "text-center dark:border-t dark:border-t-slate-600",
      },
    },
  },
];

const table = useTemplateRef("table");

const rowSelection = ref<Record<string, boolean>>({});

function onSelect(row: TableRow<TColumnTodo>, e?: Event) {
  /* If you decide to also select the column you can do this  */
  //row.toggleSelected(!row.getIsSelected());
  chandeCompleted(row);
}

const chandeCompleted = (row: TableRow<TColumnTodo>) => {
  let selData = !row.getIsSelected();
  if (GlobalUserData.value) {
    row.original.completed = selData;
    row.toggleSelected(selData);
    //@ts-ignore
    GlobalUserData.value.userdata.todos[row.index].completed = selData;
    GlobalUserData.value.userdata.todos = [
      ...GlobalUserData.value.userdata.todos,
    ];
  }
};

onMounted(async () => {
  // clear();
  // await execute();
  await nextTick(() => {
    table.value?.tableApi.toggleAllPageRowsSelected(false);
    //currentUserData.value = GlobalUserData.value as TUserData;
  });
});

watch(
  rowSelection,
  () => {
    nextTick(() => {
      if (table) {
        RowSelectedLength.value =
          table.value?.tableApi.getFilteredSelectedRowModel().rows.length || 0;
        // RowSelectedLength.value++;
      }
    });
  },
  { deep: true }
);
</script>

<template>
  <section>
    <div class="flex flex-row gap-3 items-center justify-between my-2">
      <h5 class="font-bold">{{ currUser.userdata.username }}</h5>
      <div class="flex flex-row gap-3 px-2 py-1">
        <div>
          <span>Получено задач: </span>
          <span> {{ GlobalUserData.userdata.todos.length }}</span>
        </div>
        <div>
          <span>Завершено: </span>
          <span>{{
            GlobalUserData.userdata.todos.reduce((acc, curr) => {
              if (curr.completed) {
                acc++;
              }
              return acc;
            }, 0)
          }}</span>
        </div>
      </div>
    </div>
    <UTable
      ref="table"
      :data="GlobalUserData.userdata.todos"
      :columns="columns"
      v-model:row-selection="rowSelection"
      @select="onSelect"
      sticky
      class="text-xs lg:text-sm h-[60vh] mt-3 flex-1"
    >
    </UTable>
    <div
      class="px-4 py-3.5 text-sm text-muted bg-neutral-100 dark:bg-slate-900 dark:text-neutral"
    >
      Завершено
      <!-- {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} -->
      {{ RowSelectedLength }}
      из {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} задач.
    </div>
  </section>
</template>
