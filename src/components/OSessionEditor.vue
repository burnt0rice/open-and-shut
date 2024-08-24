<template>
  <div v-if="session">
    <div class="text-lg font-bold mb-5">Edit session</div>
    <div class="p-1">
      <div class="flex gap-3 justify-between items-center mb-3">
        <label for="start" class="min-w-20">Start</label>
        <VueDatePicker
          id="start"
          v-model="start"
          enable-seconds
          :clearable="false"
          :dark="calendarTheme"
          :ui="{
            input: 'bg-base-100 text-base-content pr-0 border-none',
            calendar: 'bg-base-300 text-base-content',
            menu: 'bg-base-300 text-base-content',
          }"
        />
      </div>
      <div class="flex gap-3 justify-between items-center mb-3">
        <label for="end" class="min-w-20">End</label>
        <VueDatePicker
          id="end"
          v-model="end"
          enable-seconds
          :clearable="false"
          :dark="calendarTheme"
          :ui="{
            input: 'bg-base-100 text-base-content pr-0 border-none',
            calendar: 'bg-base-300 text-base-content',
            menu: 'bg-base-300 text-base-content',
          }"
        />
      </div>
      <div class="flex gap-3 justify-between items-center mb-3">
        <label for="comment" class="min-w-20">Comment</label>
        <input
          id="comment"
          v-model="session.comment"
          type="text"
          class="input input-sm input-bordered rounded-lg w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineModel } from "vue";
import { useMainStore } from "../store";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { DateTime } from "luxon";

const session = defineModel();
const mainStore = useMainStore();

const calendarTheme = computed(() => {
  const darkTheme = [
    "dark",
    "synthwave",
    "halloween",
    "forest",
    "black",
    "luxury",
    "dracula",
    "business",
    "night",
    "coffee",
    "dim",
    "sunset",
  ];

  console.log(mainStore.theme, darkTheme.includes(mainStore.theme));
  return darkTheme.includes(mainStore.theme);
});

const start = computed({
  get: () => DateTime.fromISO(session.value.start).toISO(),
  set: (value) => {
    session.value.start = DateTime.fromJSDate(value).toISO();
  },
});

const end = computed({
  get: () => DateTime.fromISO(session.value.end).toISO(),
  set: (value) => {
    console.log(value);
    session.value.end = DateTime.fromJSDate(value).toISO();
  },
});
</script>
