import { boot } from "quasar/wrappers";
import AppPageContainer from "src/components/AppPageContainer.vue";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component("app-page-container", AppPageContainer);
});
