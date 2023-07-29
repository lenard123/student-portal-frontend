import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSubjectsStore = defineStore("subjects", () => {
  const subjects = ref([]);
  const loading = ref(false);

  const fetchAll = async () => {
    loading.value = true;
    const { data } = await api
      .get("/subjects")
      .finally(() => (loading.value = false));
    subjects.value = data;
    return data;
  };

  const createSubject = async (payload) => {
    const { data } = await api.post("/subjects", payload);
    subjects.value.push(data);
    return data;
  };

  return {
    subjects,
    fetchAll,
    createSubject,
    loading,
  };
});
