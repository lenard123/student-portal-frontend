import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSchedule = (schedule_id) => {
  return defineStore(`schedules:${schedule_id}`, () => {
    const schedule = ref(null);
    const posts = ref([]);
    const lessons = ref([]);
    const assignments = ref([]);
    const submittedAssignments = ref([]);

    const fetch = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}`);
      schedule.value = data;
    };

    const fetchSubmittedAssignments = async () => {
      const { data } = await api.get(
        `/schedules/${schedule_id}/submitted-assignments`
      );
      submittedAssignments.value = data;
      return data;
    };

    const getSubmittedAssignment = (assignment_id) => {
      return (
        submittedAssignments.value.find(
          (assignment) => assignment.assignment_id == assignment_id
        ) ?? {
          status: "pending",
        }
      );
    };

    const fetchPosts = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}/posts`);
      posts.value = data;
    };

    const fetchLessons = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}/lessons`);
      lessons.value = data;
    };

    const fetchAssignments = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}/assignments`);
      assignments.value = data;
      return data;
    };

    const createAssignments = async ({
      title,
      description,
      files,
      deadline,
    }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (deadline) formData.append("deadline", deadline);
      files.forEach((file, i) => formData.append(`files[${i}]`, file));

      const { data } = await api.post(
        `/schedules/${schedule_id}/assignments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      assignments.value.splice(0, 0, data);
      return data;
    };

    const createLesson = async ({ title, description, files }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      files.forEach((file, i) => formData.append(`files[${i}]`, file));

      const { data } = await api.post(
        `/schedules/${schedule_id}/lessons`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      lessons.value.splice(0, 0, data);
    };

    const createPost = async (description) => {
      const { data } = await api.post(`/schedules/${schedule_id}/posts`, {
        description,
      });
      posts.value.splice(0, 0, data);
    };

    return {
      lessons,
      createLesson,
      fetchLessons,
      createAssignments,
      createPost,
      schedule,
      fetch,
      posts,
      fetchPosts,
      fetchAssignments,
      assignments,
      submittedAssignments,
      fetchSubmittedAssignments,
      getSubmittedAssignment,
    };
  })();
};

export const useSchedulesStore = defineStore("schedules", () => {
  const schedules = ref(null);
  const fetchAll = async () => {
    const { data } = await api.get("/schedules");
    schedules.value = data;
    return data;
  };

  return {
    schedules,
    fetchAll,
  };
});
