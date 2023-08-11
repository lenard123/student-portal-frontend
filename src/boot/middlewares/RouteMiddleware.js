import { ROLE_ADMIN, ROLE_STUDENT, useAuthStore } from "src/stores/auth";

export function auth() {
  const store = useAuthStore();
  if (store.user == null) return { name: "login" };
}

export function admin() {
  const store = useAuthStore();
  if (store.user.role != ROLE_ADMIN) return { name: "login" };
}

export function student() {
  const store = useAuthStore();
  if (store.user.role != ROLE_STUDENT) return { name: "login" };
}

export function guest() {
  const store = useAuthStore();
  if (!!store.user?.role) {
    if (store.user.role == ROLE_ADMIN) return { name: "admin:announcements" };
    if (store.user.role == ROLE_STUDENT) return { name: "student:home" };
    return { name: "home" };
  }
}
