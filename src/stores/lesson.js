import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useLesson = (id) => {
  return defineStore(`lessons:${id}`, () => {
    const lesson = ref(null);
    const fetchLesson = async () => {
      const { data } = await api.get(`/lessons/${id}`);
      lesson.value = data;
    };

    return {
      lesson,
      fetchLesson,
    };
  })();
};
