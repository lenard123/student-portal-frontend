<template>
  <div class="tw-flex tw-flex-grow tw-min-h-0 tw-h-full">
    <div class="tw-w-[350px] tw-bg-white tw-flex-shrink-0 tw-border-r">
      <div class="tw-p-4 tw-h-16">
        <div class="tw-text-3xl tw-font-bold">Messages</div>
      </div>
      <q-separator />
      <q-list separator class="tw-relative">
        <thread-item
          v-bind="thread"
          v-for="thread in store.threads"
          :key="thread.id"
        />
        <q-inner-loading :showing="store.loading" />
      </q-list>
    </div>

    <div class="tw-flex-grow tw-min-h-0">
      <router-view v-if="!store.loading" />
    </div>
  </div>
</template>

<script setup>
import ThreadItem from "./components/ThreadItem.vue";
import { useThreadStore } from "src/stores/thread";
import { onMounted } from "vue";

const store = useThreadStore();

onMounted(() => {
  store.fetchThreads();
});
</script>
