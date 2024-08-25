<template>
  <header class="flex justify-between pb-4">
    <h1 class="text-lg font-bold">{{ greeting }}.</h1>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-sm btn-ghost">
        <ellipsis-horizontal-icon class="w-6 h-6" />
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <a href="#settingsModal" class="flex gap-2 items-center rounded-lg">
            <cog6-tooth-icon class="w-4 h-4" />
            Settings
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { DateTime } from "luxon";
import {
  EllipsisHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";


const greeting = computed(() => {
  //Set greeting
  const now = DateTime.now();
  const hour = now.hour;

  if (hour >= 0 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
});
</script>
