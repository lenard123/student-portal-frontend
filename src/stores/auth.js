import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";

export const ROLE_ADMIN = "admin";
export const ROLE_STUDENT = "student";
export const ROLE_FACULTY = "faculty";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(undefined);

  const login = async (payload) => {
    const { data } = await api.post("/login", payload);
    user.value = data;
    return data;
  };

  const logout = async (role) => {
    await api.post("logout", { role });
    user.value = undefined;
  };

  const fullname = computed(() => {
    if (!user.value) return "";
    return user.value.firstname + " " + user.value.lastname;
  });

  const initializeCSRFCookie = async () => {
    await api.get("/csrf-cookie");
  };

  const fetchCurrentUser = async (role) => {
    const { data } = await api.get(`/user/${role}`);
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
