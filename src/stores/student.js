import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { onBeforeUnmount, onMounted, onUnmounted, ref } from "vue";

export const useStudentsStore = defineStore("students", () => {
  const subjects = ref([]);

  const sendOtp = async (payload) => {
    const { data } = await api.post("/students/send-otp", payload);
    return data;
  };

  const fetchSubjects = async () => {
    const { data } = await api.get("/student/subjects");
    subjects.value = data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/students/register", payload);
    return data;
  };

  return {
    sendOtp,
    register,
    fetchSubjects,
    subjects,
  };
});

export const useOtp = () => {
  const payload = ref();
  const throttle = ref(0);
  const store = useStudentsStore();
  const loading = ref(false);

  const sendOtp = async (data) => {
    if (loading.value) return;
    try {
      loading.value = true;
      await store.sendOtp(data);
      payload.value = data;
      throttle.value = 60;
    } finally {
      loading.value = false;
    }
  };

  const resend = async () => {
    if (throttle.value > 0) return;
    await sendOtp(payload.value);
  };

  const timer = () => {
    throttle.value = Math.max(0, throttle.value - 1);
  };

  onMounted(() => {
    setInterval(timer, 1000);
  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return {
    sendOtp,
    resend,
    loading,
    throttle,
  };
};
