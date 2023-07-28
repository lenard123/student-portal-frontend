import { useAuthStore } from "src/stores/auth";

export function auth() {
  const store = useAuthStore();
  if (store.user == null) return { name: "login" };
}

export function admin() {
  const store = useAuthStore();
  if (store.user.role != "admin") return { name: "login" };
}

export function guest() {
  const store = useAuthStore();
  if (!!store.user?.role) {
    if (store.user.role == "admin") return { name: "admin:announcements" };
    return { name: "home" };
  }
}
