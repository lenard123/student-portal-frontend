<template>
  <div class="tw-flex tw-flex-col tw-bg-white tw-h-full tw-relative">
    <q-inner-loading :showing="store.loading" />
    <div class="tw-h-16 tw-p-4">
      <div class="tw-text-3xl tw-font-bold">{{ store.thread?.name }}</div>
    </div>
    <q-separator />
    <div class="tw-flex-grow tw-p-4 tw-min-h-0 tw-overflow-y-auto">
      <ThreadChatItem
        v-for="message in store.messages"
        :key="message.id"
        :message="message"
        :sent="isSent(message)"
      />
    </div>
    <q-separator />
    <q-form @submit="send" class="tw-p-2 wrapper">
      <q-input
        :loading="sending"
        v-model="message"
        rounded
        outlined
        placeholder="Enter message here"
      >
        <template v-slot:append>
          <q-icon @click="send" v-if="!sending" name="send" />
        </template>
      </q-input>
    </q-form>
  </div>
</template>

<script setup>
import ThreadChatItem from "src/layouts/MessageLayout/components/ThreadChatItem.vue";
import { useAuthStore } from "src/stores/auth";
import { useMessageStore } from "src/stores/message";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const store = useMessageStore();
const authStore = useAuthStore();
const route = useRoute();

const isSent = (message) => {
  if (authStore.user.role == "admin") {
    return message.user_id !== store.thread.members[0].id;
  }
};

const sending = ref(false);
const message = ref("");

const send = async () => {
  if (sending.value) return;
  if (message.value.length == 0) return;
  sending.value = true;
  try {
    await store.sendMessage(message.value);
    message.value = "";
  } finally {
    sending.value = false;
  }
};

const refetch = () => {
  if (route.params.thread_id) {
    store.setThreadId(route.params.thread_id);
    store.fetchMessages();
  }
};

onMounted(refetch);
watch(route, refetch);
</script>
