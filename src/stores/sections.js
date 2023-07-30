import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSectionInfo = (section_id) => {
  return defineStore(`/sections/${section_id}`, () => {
    const section = ref({});
    const initialized = ref(false);
    const fetch = async () => {
      const { data } = await api.get(`/sections/${section_id}`);
      section.value = data;
      initialized.value = true;
    };

    const addSubject = async (payload) => {
      const { data } = await api.post(
        `/sections/${section_id}/subjects`,
        payload
      );
      return data;
    };

    return {
      addSubject,
      section,
      initialized,
      fetch,
    };
  })();
};

export const useSections = (academic_year_id) => {
  return defineStore(`academic-year/${academic_year_id}/sections`, () => {
    const sections = ref([]);
    const loading = ref(false);
    const fetch = async () => {
      try {
        loading.value = true;
        const { data } = await api.get(
          `/academic-years/${academic_year_id}/sections`
        );
        sections.value = data;
      } finally {
        loading.value = false;
      }
    };

    const create = async (payload) => {
      const { data } = await api.post(
        `/academic-years/${academic_year_id}/sections`,
        payload
      );
      sections.value.push(data);
      return data;
    };

    return {
      sections,
      create,
      loading,
      fetch,
    };
  })();
};
