import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useAnnouncementStore = defineStore("announcements", () => {
  const announcements = ref();
  const fetchingAnnouncements = ref(false);

  const fetchAnnouncements = async () => {
    fetchingAnnouncements.value = true;
    const { data } = await api.get("/announcements").finally(() => {
      fetchingAnnouncements.value = false;
    });
    announcements.value = data;
    return data;
  };

  const createAnnouncements = async (payload) => {
    const { data } = await api.post("/announcements", payload);
    announcements.value?.push(data);
    return data;
  };

  const updateAnnouncements = async (payload) => {
    const { data } = await api.put(`/announcements/${payload.id}`, payload);
    announcements.value = announcements.value?.map((item) =>
      item.id == payload.id ? data : item
    );
    return data;
  };

  const deleteAnnouncement = async (id) => {
    await api.delete(`/announcements/${id}`);
    announcements.value = announcements.value?.filter((item) => item.id !== id);
  };

  return {
    announcements,
    fetchingAnnouncements,
    fetchAnnouncements,
    createAnnouncements,
    updateAnnouncements,
    deleteAnnouncement,
  };
});
