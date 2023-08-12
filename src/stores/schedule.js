import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSchedule = (schedule_id) => {
  return defineStore(`schedules:${schedule_id}`, () => {
    const schedule = ref(null);
    const posts = ref([]);

    const fetch = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}`);
      schedule.value = data;
    };

    const fetchPosts = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}/posts`);
      posts.value = data;
    };

    const createPost = async (description) => {
      const { data } = await api.post(`/schedules/${schedule_id}/posts`, {
        description,
      });
      posts.value.splice(0, 0, data);
    };

    return {
      createPost,
      schedule,
      fetch,
      posts,
      fetchPosts,
    };
  })();
};

export const useSchedulesStore = defineStore("schedules", () => {
  const schedules = ref(null);
  const fetchAll = async () => {
    const { data } = await api.get("/schedules");
    schedules.value = data;
    return data;
  };

  return {
    schedules,
    fetchAll,
  };
});
