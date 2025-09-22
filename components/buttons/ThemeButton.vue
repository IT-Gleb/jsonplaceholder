<script setup lang="ts">
import { ref, watch } from "vue";

const Value = ref<boolean>(false);

type TParamTheme = {
  RemoveClass: "light" | "dark";
  AddClass: "light" | "dark";
};

function changeDocumentClass(props: TParamTheme) {
  document.documentElement.classList.remove(props.RemoveClass);
  document.documentElement.classList.add(props.AddClass);
}

const hanglerSwitchTheme = () => {
  switch (Value.value) {
    case true:
      changeDocumentClass({ RemoveClass: "light", AddClass: "dark" });
      break;
    case false:
      changeDocumentClass({ RemoveClass: "dark", AddClass: "light" });
      break;
  }
};

watch(Value, () => {
  hanglerSwitchTheme();
});
</script>

<template>
  <USwitch
    uncheckedIcon="i-lucide-lightbulb"
    checkedIcon="i-lucide-moon-star"
    size="xl"
    v-model="Value"
    color="neutral"
  />
</template>
