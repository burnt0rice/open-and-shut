<template>
  <div :data-theme="store.theme" class="w-screen h-screen flex flex-col p-3 pt-5">
    <o-header />
    <o-tracker />
    <o-session-list />

    <o-settings-dialog />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from "./store";
import OHeader from "./components/OHeader.vue";
import OTracker from "./components/OTracker.vue";
import OSessionList from "./components/OSessionList.vue";
import OSettingsDialog from "./components/OSettings.vue";

const store = useMainStore();

onMounted(() => {});
</script>
