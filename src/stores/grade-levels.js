import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useAppStore } from "./app";

export const useGradeLevel = (id) => {
  return defineStore(`grade-levels/${id}`, () => {
    const initialize = ref(false);
    const level = ref({});
    const loading = ref(false);

    const addSubject = async (subject_id) => {
      const { data } = await api.post(`/grade-levels/${id}/subjects`, {
        subject_id,
      });
      level.value.subjects = data;
      return data;
    };

    const addFee = async (payload) => {
      const { data } = await api.post(`/grade-levels/${id}/fees`, payload);
      level.value.fees = data;
      return data;
    };

    const fetch = async () => {
      loading.value = true;
      try {
        const { data } = await api.get(`/grade-levels/${id}`);
        level.value = data;
        initialize.value = true;
      } finally {
        loading.value = true;
      }
    };

    return {
      addSubject,
      addFee,
      initialize,
      level,
      loading,
      fetch,
    };
  })();
};

export const useGradeLevelsStore = defineStore("grade-levels", () => {
  const gradeLevels = ref([]);
  const appStore = useAppStore();
  const loading = ref(false);
  const fetchAll = async () => {
    try {
      loading.value = true;
      const { data } = await api.get("/grade-levels");
      gradeLevels.value = data;
    } finally {
      loading.value = false;
    }
  };

  const departmentGradeLevels = computed(() => {
    return appStore.departments.reduce((acm, department) => {
      return {
        ...acm,
        [department.id]: gradeLevels.value.filter(
          (level) => level.department == department.id
        ),
      };
    }, {});
  });

  return {
    gradeLevels,
    departmentGradeLevels,
    loading,
    fetchAll,
  };
});
