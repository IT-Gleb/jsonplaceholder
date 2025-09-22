<script setup lang="ts">
import { getNowYear } from "~~/utils/functions";
import MainHeader from "~~/components/layouts/MainHeader.vue";
</script>

<template>
  <div>
    <header class="sticky top-0 z-10">
      <main-header />
    </header>
    <main
      class="w-full max-w-[350px] md:max-w-full lg:w-[80vw] lg:mx-auto xl:w-[70vw]"
    >
      <slot></slot>
    </main>
    <footer>
      <div class="p-2 text-center place-content-center">
        <span>&nbsp;</span>
        <span> &copy; 2000-{{ getNowYear() }} </span>
      </div>
    </footer>
  </div>
</template>
