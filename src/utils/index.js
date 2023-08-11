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

// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const numberFormat = (n) => {
  return formatter.format(n);
};
