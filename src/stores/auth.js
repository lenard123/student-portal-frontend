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
    switch (role) {
      case "student":
        await api.post("/student-logout");
        break;
      default:
        await api.post("/logout");
    }
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
    switch (role) {
      case "student": {
        const { data } = await api.get("/student");
        user.value = data;
        break;
      }

      default: {
        const { data } = await api.get("/user");
        user.value = data;
        break;
      }
    }

    return user.value;
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
