<template>
  <div :data-theme="mainStore.theme" class="w-screen h-screen flex flex-col p-3 pt-5">
    <o-header />
    <o-tracker />
    <o-sessions />

    <o-settings-dialog />
  </div>
</template>

<script setup>
import { useMainStore } from "./store";
import OHeader from "./components/OHeader.vue";
import OTracker from "./components/OTracker.vue";
import OSessions from "./components/OSessions.vue";
import OSettingsDialog from "./components/OSettings.vue";

const mainStore = useMainStore();
</script>
