import { ref } from "vue";
export * as Notify from "./Notify";

export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const useAction = (callback) => {
  const data = ref(undefined);
  const error = ref(undefined);
  const isLoading = ref(false);

  const dispatch = async (...args) => {
    isLoading.value = true;
    try {
      const result = await callback(...args);
      data.value = result;
    } catch (error) {
      error.value = error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    error,
    isLoading,
    dispatch,
  };
};
