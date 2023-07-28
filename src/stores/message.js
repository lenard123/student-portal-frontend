import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useThreadStore } from "./thread";

export const useMessageStore = defineStore("messages", () => {
  const threadStore = useThreadStore();
  const messages = ref({});
  const thread_id = ref(null);
  const loading = ref(false);

  const setThreadId = (id) => (thread_id.value = id);

  const thread = computed(() =>
    threadStore.threads.find((i) => i.id == thread_id.value)
  );

  const fetchMessages = async () => {
    loading.value = true;
    const { data } = await api
      .get(`/threads/${thread_id.value}/messages`)
      .finally(() => (loading.value = false));
    messages.value[thread_id.value] = data;
    return data;
  };

  const sendMessage = async (message) => {
    const { data } = await api.post(`/threads/${thread_id.value}/messages`, {
      message,
    });
    messages.value?.[thread_id.value].push(data);
    return data;
  };

  return {
    _messages: messages,
    sendMessage,
    loading,
    setThreadId,
    fetchMessages,
    thread,
    messages: computed(() => {
      return messages.value[thread_id.value];
    }),
  };
});
