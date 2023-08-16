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

  const startEnrollment = async (academic_year_id) => {
    const { data } = await api.patch(
      `/academic-years/${academic_year_id}/start-enrollment`
    );
    academicYears.value = academicYears.value.map((ay) =>
      ay.id == academic_year_id ? data : ay
    );
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

  const activeDepartmentOptions = computed(() => {
    return appStore.departments.filter((department) => {
      return activeAcademicYear.value[department.id] != null;
    });
  });

  return {
    startEnrollment,
    activeDepartmentOptions,
    activeAcademicYear,
    fetchActiveAcademicYear,
    academicYears,
    departmentAcadamicYears,
    fetchAll,
    loading,
    create,
  };
});
