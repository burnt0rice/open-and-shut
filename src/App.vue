<template>
  <div class="w-screen h-screen flex flex-col p-3 pt-5">
    <o-header />
    <o-tracker />
    <o-session-list />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import OHeader from "./components/OHeader.vue";
import OTracker from "./components/OTracker.vue";
import OSessionList from "./components/OSessionList.vue";

onMounted(() => {});
</script>
