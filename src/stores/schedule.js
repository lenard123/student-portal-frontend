import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSchedule = (schedule_id) => {
  return defineStore(`schedules:${schedule_id}`, () => {
    const schedule = ref(null);
    const fetch = async () => {
      const { data } = await api.get(`/schedules/${schedule_id}`);
      schedule.value = data;
    };

    return {
      schedule,
      fetch,
    };
  })();
};
