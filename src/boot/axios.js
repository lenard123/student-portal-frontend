import axios from "axios";
import { boot } from "quasar/wrappers";
import ResponseMiddleware from "./middlewares/ResponseMiddleware";
import ErrorHandler from "./middlewares/ErrorHandler";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

window.axios = api;

export default boot(async ({ app, router }) => {
  api.interceptors.response.use(ResponseMiddleware, ErrorHandler);
});

export { api };
