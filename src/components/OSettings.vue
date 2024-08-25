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
      <div>
        <button
          class="btn btn-sm btn-primary w-full my-4 rounded-lg"
          @click="downloadData"
        >
          Download Data as CSV
        </button>
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
import { save } from "@tauri-apps/api/dialog";
import { writeFile } from "@tauri-apps/api/fs";
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

const mainStore = useMainStore();

const selectedTheme = computed({
  get: () => mainStore.theme,
  set: (theme) => mainStore.setTheme(theme),
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const downloadData = async () => {
  const data = mainStore.sessions;
  const csv = convertToCSV(data);

  const filePath = await save({
    defaultPath: "data.csv",
    filters: [{ name: "CSV Files", extensions: ["csv"] }],
  });

  if (filePath) {
    await writeFile({ path: filePath, contents: csv });
  }
};

const convertToCSV = (arr) => {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
};
</script>
