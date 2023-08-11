import { Loading } from "quasar";
import { boot } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth";
import { useAction } from "src/utils";
import { api } from "./axios";
import { useAcademicYearStore } from "src/stores/academic-year";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const { fetchCurrentUser, initializeCSRFCookie } = useAuthStore();
  const { fetchActiveAcademicYear } = useAcademicYearStore();
  Loading.show();
  try {
    await initializeCSRFCookie();
    // await fetchCurrentUser();
    await fetchActiveAcademicYear();
  } catch (err) {
  } finally {
    Loading.hide();
  }
});
