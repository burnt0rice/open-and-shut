<template>
  <div class="modal" role="dialog" id="settingsModal">
    <div class="modal-box py-2 px-3 rounded-lg">
      <a
        href="#"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        <x-mark-icon class="w-4 h-4" />
      </a>
      <div class="text-lg font-bold">Settings</div>
      <div class="flex flex-col py-4">
        <div class="flex justify-between items-center gap-3">
          <div>Theme</div>
          <select
            v-model="selectedTheme"
            class="select select-bordered select-sm w-full max-w-xs rounded-lg"
          >
            <option
              v-for="theme in themes"
              :key="`theme_${theme}`"
              :value="theme"
            >
              {{ capitalize(theme) }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full flex justify-center text-xs pt-2">
        Made with <heart-icon class="text-primary w-4 h-4 mx-1" /> by&nbsp;
        <a
          class="underline decoration-dashed"
          href="https://ricefield.ch"
          target="_blank"
        >
          Ricefield
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "../store";
import { HeartIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const store = useMainStore();

const selectedTheme = computed({
  get: () => store.theme,
  set: (theme) => store.setTheme(theme),
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
