import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(undefined);

  const login = async (payload) => {
    const { data } = await api.post("/login", payload);
    user.value = data;
    return data;
  };

  const logout = async () => {
    await api.post("/logout");
    user.value = undefined;
  };

  const fullname = computed(() => {
    if (!user.value) return "";
    return user.value.firstname + " " + user.value.lastname;
  });

  const initializeCSRFCookie = async () => {
    await api.get("/csrf-cookie");
  };

  const fetchCurrentUser = async () => {
    const { data } = await api.get("/user");
    user.value = data;
    return data;
  };

  return {
    user,
    logout,
    fullname,
    login,
    fetchCurrentUser,
    initializeCSRFCookie,
  };
});
