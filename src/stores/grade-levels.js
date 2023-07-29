import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useAppStore } from "./app";

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
