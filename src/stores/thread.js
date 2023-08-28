import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { ROLE_ADMIN, useAuthStore } from "./auth";

export function getThreadInfo(user, thread) {
  if (user.role == ROLE_ADMIN) {
    return {
      avatar: "https://avatars.dicebear.com/api/initials/admin+example.svg",
      name: thread.members[0].firstname + " " + thread.members[0].lastname,
    };
  }

  for (let i = 0; i < thread.members.length; i++) {
    if (thread.members[i].id != user.id) {
      return {
        avatar: thread.members[i].avatar,
        name: thread.members[i].fullname,
      };
    }
  }

  return {};
}

export const useThreadStore = defineStore("threads", () => {
  const threads = ref([]);
  const loading = ref(false);

  const authStore = useAuthStore();

  const fetchThreads = async () => {
    loading.value = true;
    try {
      const { data } = await api.get("/threads");
      threads.value = data;
    } catch (err) {
    } finally {
      loading.value = false;
    }
  };

  const computedThreads = computed(() => {
    return threads.value.map((thread) => {
      const threadInfo = getThreadInfo(authStore.user, thread);
      return {
        ...thread,
        ...threadInfo,
      };
    });
  });

  return {
    loading,
    threads: computedThreads,
    fetchThreads,
  };
});
