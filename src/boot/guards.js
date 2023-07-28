import { boot } from "quasar/wrappers";
import * as middlewares from "./middlewares/RouteMiddleware";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  router.beforeEach((to, from) => {
    const routeMiddlewares = to.meta.middlewares ?? [];

    return routeMiddlewares.reduce((acm, middleware) => {
      if (acm != undefined) return acm;
      return middlewares[middleware](to, from);
    }, undefined);
  });
});
