import { Notify } from "src/utils";

function getErrorMessage(error) {
  const code = error?.response?.status;

  if (!code) return "An error occured while connecting to the server.";

  if (code === 401) return "You need to login first.";

  if (error.response?.data?.message) return error.response.data.message;

  if (code === 500) return "An error occured to the server.";

  return "Sorry something went wrong, please try again. Contact Administrator if the problem persist.";
}

export default function ErrorHandler(error) {
  const message = getErrorMessage(error);
  Notify.error(message);
  return Promise.reject(error);
}
