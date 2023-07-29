import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useAppStore } from "./app";

export const useAcademicYearStore = defineStore("academic-year", () => {
  const academicYears = ref([]);
  const activeAcademicYear = ref(null);
  const loading = ref(false);
  const appStore = useAppStore();

  const fetchActiveAcademicYear = async () => {
    const { data } = await api.get("/academic-years/active");
    activeAcademicYear.value = data;
    return data;
  };

  const fetchAll = async () => {
    try {
      loading.value = false;
      const { data } = await api.get("/academic-years");
      academicYears.value = data;
    } finally {
      loading.value = false;
    }
  };

  const create = async (payload) => {
    const { data } = await api.post("/academic-years", payload);
    academicYears.value.push(data);
    return data;
  };

  const departmentAcadamicYears = computed(() => {
    return appStore.departments.reduce((acm, department) => {
      return {
        ...acm,
        [department.id]: academicYears.value.filter(
          (sy) => sy.department == department.id
        ),
      };
    }, {});
  });

  return {
    activeAcademicYear,
    fetchActiveAcademicYear,
    academicYears,
    departmentAcadamicYears,
    fetchAll,
    loading,
    create,
  };
});
