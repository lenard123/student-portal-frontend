import { Notify } from "quasar";

export function error(errorMsg) {
  return Notify.create({
    type: "negative",
    message: errorMsg,
    position: "bottom",
  });
}

export function success(message) {
  return Notify.create({
    type: "positive",
    message,
    position: "bottom",
  });
}
