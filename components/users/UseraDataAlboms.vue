<script setup lang="ts">
import { useState } from "nuxt/app";
import { watch, ref, onMounted, nextTick } from "vue";
import type {
  TArrayAlbomImage,
  TArrayAlbums,
  TArrayPhotos,
  TUserData,
} from "../../types/user";
import type { AccordionItem } from "@nuxt/ui";
import UserImages from "./UserImages.vue";
import { useMediaQuery } from "@vueuse/core";

const userData = useState<TUserData>("currentUserData");
const accordItems = ref<AccordionItem[]>([]);

const isMobile = useMediaQuery("(width < 768.5px)", { ssrWidth: 768 });

const active = ref<string>("");

const handlerPhotos = (paramAlbomId: number) => {
  //AlbomPhotos.value = [];
  const tmpImages = userData.value.userdata.images as TArrayPhotos;

  return tmpImages.reduce((arr, value) => {
    const curr = value.filter(
      (item) => item.albumId === paramAlbomId
    ) as TArrayAlbomImage;

    if (curr.length > 0) {
      arr = arr.concat(curr);
    }
    return arr;
  }, []) as TArrayAlbomImage;
};

const handlerFirstLetter = (paramArray: TArrayAlbums) => {
  return paramArray.map((item) => {
    let abc = item.title
      .split("")
      .map((item, index) => {
        if (index === 0) {
          return item.toUpperCase();
        }
        return item;
      })
      .join("");

    return { ...item, title: abc };
  });
};

onMounted(() => {
  userData.value.userdata.albums = handlerFirstLetter(
    userData.value.userdata.albums
  );
});

watch(
  () => userData.value,
  () => {
    accordItems.value = [];
    //console.log(userData.value);

    nextTick(() => {
      //@ts-ignore
      accordItems.value = userData.value.userdata.albums.map((item) => {
        let tmp: string = item.title
          .split("")
          .map((value, index) => {
            if (index === 0) {
              return value.toUpperCase();
            }
            return value;
          })
          .join("");
        item.title = tmp;
        const dataArray = handlerPhotos(item.id);

        return {
          label: `${item.id}. ${item.title}`,
          icon: "i-lucide-check",
          content: JSON.stringify(dataArray),
        };
      });
    });
  },
  { deep: true }
);
</script>

<template>
  <UAccordion
    :items="accordItems"
    :unmount-on-hide="true"
    :collabsable="false"
    trailing-icon="i-lucide-arrow-down"
    type="single"
    v-model="active"
    class="w-full max-w-xs mt-5 mx-auto lg:max-w-3xl"
  >
    <template #default="{ item }">
      <UBadge
        color="secondary"
        variant="subtle"
        :label="item.label"
        class="text-neutral"
        :size="isMobile ? 'sm' : 'lg'"
      />
    </template>
    <template #content="{ item }">
      <UserImages :obj="item.content as string" />
    </template>
  </UAccordion>
</template>
