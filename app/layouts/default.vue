<script setup lang="ts">
import { getNowYear } from "~~/utils/functions";
import MainHeader from "~~/components/layouts/MainHeader.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-10">
      <main-header />
    </header>
    <main class="lg:w-[75vw] lg:mx-auto xl:w-[70vw] flex-1">
      <slot></slot>
    </main>
    <footer>
      <div class="p-2 text-center place-content-center">
        <span>&nbsp;</span>
        <span> Gleb Torgashin &copy; 2000-{{ getNowYear() }} </span>
      </div>
    </footer>
  </div>
</template>
