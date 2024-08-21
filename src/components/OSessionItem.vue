<template>
  <div class="px-2 py-3">
    <div class="flex items-center gap-3 mb-2">
      <div v-if="sessionDuration" class="text-xl">{{ sessionDuration }}</div>
      <input
        v-model="comment"
        type="text"
        placeholder="Comment"
        class="input input-bordered input-sm bg-base-300 w-full flex-1 rounded-lg"
      />
    </div>
    <div class="flex items-center gap-2">
      <div class="text-sm text-neutral">{{ sessionFromTo }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useMainStore } from "../store";
import { DateTime } from "luxon";

const mainStore = useMainStore();

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
});

const sessionDuration = computed(() => {
  if (!props.session.end) {
    return "";
  }

  const start = DateTime.fromISO(props.session.start);
  const end = DateTime.fromISO(props.session.end);
  const diff = end.diff(start);

  return diff.toFormat("hh:mm:ss");
});

const comment = computed({
  get: () => props.session.comment,
  set: (value) => {
    mainStore.updateSessionComment(props.session.id, value);
  },
});

const sessionFromTo = computed(() => {
  if (!props.session.end) {
    const start = DateTime.fromISO(props.session.start);

    return `${start.toFormat("yyyy-MM-dd HH:mm")} - Current Session`;
  }

  const start = DateTime.fromISO(props.session.start);
  const end = DateTime.fromISO(props.session.end);

  return `${start.toFormat("yyyy-MM-dd HH:mm")} - ${end.toFormat("yyyy-MM-dd HH:mm")}`;
});
</script>
