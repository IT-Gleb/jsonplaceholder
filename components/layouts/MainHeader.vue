<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ThemeButton from "../buttons/ThemeButton.vue" ;

const menuNames : {name:string; icon:string}[] =[{name:"Главная", icon:"i-lucide-house"}, {name:"Пользователи", icon:"i-lucide-users"} ];

const router = useRouter();


const MainMenuItems = ref<NavigationMenuItem[]>(
  router.getRoutes().map((item, index) => ({
    label: index < menuNames.length?menuNames[index]?.name:"",
    icon: index < menuNames.length?menuNames[index]?.icon:"",
    description: "",
    to: item.path,
    children: [],
  }))
);
</script>

<template>
  <UNavigationMenu
    
    highlight
    orientation="horizontal"
    variant="pill"
    color="neutral"
    :items="MainMenuItems"
    class="w-full max-w-xs lg:max-w-3xl justify-center mx-auto"
  >
    <template #item-label=" {item, active} "">
      <span class="text-sm lg:text-lg font-['Montserrat']"  :class="active?'text-black dark:text-slate-200':'text-neutral-400'">{{ item.label }}</span>
    </template>
    
    <template #list-trailing>
      <ThemeButton class="ml-auto place-content-center" />
    </template>

  </UNavigationMenu>
  
</template>
