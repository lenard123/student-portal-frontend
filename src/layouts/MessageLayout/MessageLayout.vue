<template>
  <div class="tw-flex tw-flex-grow tw-min-h-0 tw-h-full">
    <div
      class="md:tw-max-w-[350px] tw-w-full tw-bg-white tw-flex-shrink-0 tw-border-r"
      :class="{
        'tw-hidden md:tw-block':
          route.name == 'portal:messages/view' ||
          route.name == 'admin:messages',
      }"
    >
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

    <div
      class="tw-flex-grow tw-min-h-0"
      :class="{
        'tw-hidden md:tw-block':
          route.name == 'portal:messages' || route.name == 'admin:threads',
      }"
    >
      <router-view v-if="!store.loading" />
    </div>
  </div>
</template>

<script setup>
import ThreadItem from "./components/ThreadItem.vue";
import { useThreadStore } from "src/stores/thread";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const store = useThreadStore();
const route = useRoute();

onMounted(() => {
  store.fetchThreads();
});
</script>
