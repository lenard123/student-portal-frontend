import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEnrollee = (enrollee_id) => {
  return defineStore(`enrollment:${enrollee_id}`, () => {
    const enrollee = ref(null);
    const loading = ref(false);

    const fetch = async () => {
      try {
        loading.value = true;
        const { data } = await api.get(`/enrollment/${enrollee_id}`);
        enrollee.value = data;
      } finally {
        loading.value = false;
      }
    };

    const enroll = async (section_id) => {
      const { data } = await api.patch(`/enrollment/${enrollee_id}/enroll`, {
        section_id,
      });
      enrollee.value = data;
    };

    return {
      enrollee,
      fetch,
      loading,
      enroll,
    };
  })();
};

export const useEnrollmentStore = defineStore("enrollment", function () {
  const enrollees = ref({});
  const loading = ref(false);

  const enroll = async (grade_level_id) => {
    const { data } = await api.post("/enrollment", { grade_level_id });
    return data;
  };

  const fetchEnrollees = async (academic_year_id) => {
    try {
      loading.value = true;
      const { data } = await api.get(
        `/academic-years/${academic_year_id}/enrollees`
      );
      enrollees.value[academic_year_id] = data;
    } finally {
      loading.value = false;
    }
    return enrollees.value[academic_year_id] ?? [];
  };

  const getEnrollees = (academic_year_id) => {
    return enrollees.value[academic_year_id] ?? [];
  };

  return {
    enroll,
    fetchEnrollees,
    loading,
    getEnrollees,
  };
});
