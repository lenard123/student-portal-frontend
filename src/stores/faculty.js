import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useFaculty = (id) => {
  return defineStore(`faculties/${id}`, () => {
    const faculty = ref({});
    const initialize = ref(false);
    const loading = ref(false);
    const fetch = async () => {
      try {
        loading.value = true;
        const { data } = await api.get(`/faculties/${id}`);
        faculty.value = data;
        initialize.value = true;
      } finally {
        loading.value = false;
      }
    };
    return {
      fetch,
      faculty,
      initialize,
      loading,
    };
  })();
};

export const useFacultyStore = defineStore("faculties", () => {
  const faculties = ref([]);
  const loading = ref(false);

  const fetchFaculties = async () => {
    loading.value = true;
    const { data } = await api
      .get("/faculties")
      .finally(() => (loading.value = false));
    faculties.value = data;
    return data;
  };

  const registerFaculty = async (payload) => {
    const { data } = await api.post("/faculties", payload);
    faculties.value.push(data);
    return data;
  };

  return {
    faculties,
    fetchFaculties,
    registerFaculty,
    loading,
  };
});
