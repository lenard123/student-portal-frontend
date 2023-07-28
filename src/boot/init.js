import { Loading } from "quasar";
import { boot } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth";
import { useAction } from "src/utils";
import { api } from "./axios";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const { fetchCurrentUser, initializeCSRFCookie } = useAuthStore();
  Loading.show();
  try {
    await initializeCSRFCookie();
    await fetchCurrentUser();
  } catch (err) {
  } finally {
    Loading.hide();
  }
});
