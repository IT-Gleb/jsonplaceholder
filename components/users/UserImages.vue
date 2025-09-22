<script setup lang="ts">
import type { TArrayAlbomImage } from "../../types/user";
import { ref } from "vue";

const props = defineProps<{ obj: string }>();

//console.log(props.obj);
//console.log(JSON.parse(props.obj));

// const urls = ref<string[]>(["https://google.com/images/0001,jpeg"]);

// const urls = ref<string[]>(
//   (JSON.parse(props.obj) as TArrayAlbomImage).map((item) => item.url)
// );

const objects = ref(JSON.parse(props.obj) as TArrayAlbomImage);

//console.log(urls.value);
</script>

<template>
  <UCarousel
    :items="objects"
    v-slot="{ item }"
    loop
    wheel-gestures
    fade
    arrows
    class="w-full max-w-xs lg:max-w-2xl lg:ml-[7%]"
    :ui="{ item: 'basis-1/1' }"
  >
    <UCard variant="soft">
      <template #header>
        <div class="uppercase">{{ item.albumId }}. {{ item.title }}</div>
      </template>
      <div class="min-h-[30dvh] p-1">
        {{ item.thumbnailUrl }}
      </div>
      <template #footer>
        {{ item.url }}
      </template>
    </UCard>
  </UCarousel>
</template>

<!-- <img
      :src="item"
      :alt="item"
      decoding="async"
      loading="lazy"
      width="480"
      height="572"
      class="border-1 overflow-hidden whitespace-pre-wrap"
    /> -->
