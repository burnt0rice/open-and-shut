<template>
  <div class="flex flex-col max-h-full overflow-scroll">
    <div class="flex justify-between items-center mb-2">
      <div class="font-bold">Sessions</div>
      <div class="flex gap-2 items-center">
        <div class="text-xs">Only Today</div>
        <input
          v-model="onlyToday"
          @input="changeOnlyToday"
          type="checkbox"
          class="toggle toggle-sm"
        />
      </div>
    </div>
    <div v-if="sessions.length > 0" class="bg-base-300 text-base-content rounded-lg flex-1 max-h-full overflow-scroll">
      <div v-for="(session, index) in sessions" :key="session.id">
        <OSessionItem :session="session" />
        <div class="px-2">
          <hr v-if="index < sessions.length - 1" class="border-base-100" />
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center mt-3">
      <div class="flex gap-2">
        <face-frown-icon class="w-6 h-6" />
        No sessions
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../store";
import { DateTime } from "luxon";
import OSessionItem from "./OSessionItem.vue";
import { FaceFrownIcon } from "@heroicons/vue/24/solid";

const mainStore = useMainStore();

const onlyToday = ref(null);

const sessions = computed(() => {
  if (onlyToday.value === true) {
    return mainStore.sessions
      .filter((session) => {
        return DateTime.fromISO(session.start).hasSame(DateTime.now(), "day");
      })
      .sort((a, b) => {
        return DateTime.fromISO(b.start) - DateTime.fromISO(a.start);
      });
  } else {
    return mainStore.sessions.sort((a, b) => {
      return DateTime.fromISO(b.start) - DateTime.fromISO(a.start);
    });
  }
});

const changeOnlyToday = (e) => {
  onlyToday.value = e.target.checked;
  localStorage.setItem("onlyToday", e.target.checked);
};

onMounted(() => {
  onlyToday.value = localStorage.getItem("onlyToday") === "true";
});
</script>
