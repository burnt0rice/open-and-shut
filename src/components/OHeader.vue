<template>
  <header class="flex justify-between pb-4">
    <h1 class="text-lg font-bold">{{ greeting }}.</h1>
    <button class="btn btn-sm btn-ghost" @click="openMenu">
      <ellipsis-horizontal-icon class="w-6 h-6" />
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { DateTime } from "luxon";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";

const greeting = ref("Hello World");

onMounted(() => {
  //Set greeting
  const now = DateTime.now();
  const hour = now.hour;

  if (hour >= 0 && hour < 12) {
    greeting.value = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting.value = "Good Afternoon";
  } else {
    greeting.value = "Good Evening";
  }
});

const openMenu = () => {
  console.log("Menu opened");
};
</script>
