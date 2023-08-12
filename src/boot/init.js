import Plugin from "@quasar/quasar-ui-qcalendar/src/QCalendarDay.js";
import "@quasar/quasar-ui-qcalendar/src/css/calendar-day.sass";
import { Loading } from "quasar";
import { boot } from "quasar/wrappers";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAuthStore } from "src/stores/auth";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(Plugin);

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
