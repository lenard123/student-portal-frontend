import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useAssignment = (id) => {
  return defineStore(`assignments:${id}`, () => {
    const assignment = ref(null);

    const fetchAssignment = async () => {
      const { data } = await api.get(`/assignments/${id}`);
      assignment.value = data;
    };

    const attachFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post(
        `/assignments/${id}/attach-file`,
        formData
      );
      assignment.value = data;
      return data;
    };

    const submitWork = async () => {
      const { data } = await api.post(`/assignments/${id}/submit-work`);
      assignment.value = data;
      return data;
    };

    const gradeWork = async ({ grade, student_id }) => {
      const { data } = await api.post(`/assignments/${id}/grade-work`, {
        grade,
        student_id,
      });
      assignment.value = data;
      return data;
    };

    return {
      gradeWork,
      assignment,
      fetchAssignment,
      attachFile,
      submitWork,
    };
  })();
};
