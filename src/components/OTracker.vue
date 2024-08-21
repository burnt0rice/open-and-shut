<template>
  <div class="p-3 mb-5 bg-neutral text-neutral-content rounded-lg">
    <div class="text-2xl mb-5">{{ trackerTitle }}</div>
    <div v-if="!mainStore.currentSession.id" class="flex justify-stretch items-center gap-3">
      <button class="btn btn-sm btn-primary flex-1" @click="startSession">
        <play-icon class="w-4 h-4" />
        Start session
      </button>
    </div>
    <!-- Pause function not implemented
    <div class="flex justify-stretch items-center gap-2 mt-5">
      <button class="btn btn-sm btn-secondary flex-1" @click="resumeSession">
        <play-icon-outline class="w-4 h-4" />
        Resume session
      </button>
      <button class="btn btn-sm" @click="stopSession">
        <stop-icon class="w-4 h-4" />
      </button>
      <button class="btn btn-sm" @click="cancelSession">
        <x-mark-icon class="w-4 h-4" />
      </button>
    </div> -->
    <div v-else-if="mainStore.currentSession.id" class="flex justify-stretch items-center gap-2 mt-5">
      <button class="btn btn-sm btn-secondary flex-1" @click="endSession">
        <stop-icon class="w-4 h-4" />
        End session
      </button>
      <button class="btn btn-sm flex-1" @click="cancelSession">
        <x-mark-icon class="w-4 h-4" />
        Cancel session
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMainStore } from "../store";
import { DateTime } from "luxon";
import { PlayIcon, StopIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { PlayIcon as PlayIconOutline } from "@heroicons/vue/24/outline";

const noSessionText = "No session started";

const mainStore = useMainStore();

const state = ref("idle");
const now = ref(DateTime.now());

const trackerTitle = computed(() => {
  if (mainStore.currentSession?.id && now.value) {
    const diff = now.value.diff(DateTime.fromISO(mainStore.currentSession.start));

    return diff.toFormat("hh:mm:ss");
  } else {
    return noSessionText;
  }
});

const startSession = () => {
  state.value = "run";

  //Create new session
  let newSession = {
    id: self.crypto.randomUUID(),
    start: DateTime.now().toISO(),
    end: null,
    comment: "",
  };

  mainStore.createAndStartSession(newSession);
};

const endSession = () => {
  state.value = "idle";

  //End current session
  const end = DateTime.now().toISO();
  mainStore.endAndSaveSession(end);
};

const cancelSession = () => {
  state.value = "idle";

  //Cancel current session
  mainStore.cancelAndRemoveSession();
};

onMounted(() => {
  mainStore.load();

  setInterval(() => {
    now.value = DateTime.now();
  }, 1000);
});
</script>
