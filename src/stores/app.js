import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = (option) =>
  defineStore("app", () => {
    const confirmDialog = ref(null);

    const closeDialog = () => {
      confirmDialog.value = null;
    };

    const showDialog = (data) => {
      confirmDialog.value = data;
    };

    const departments = [
      { id: "pre-school", value: "Pre School" },
      { id: "elementary", value: "Elementary" },
      { id: "jhs", value: "Junior Highschool" },
      { id: "shs", value: "Senior Highschool" },
    ];

    return {
      departments,
      showDialog,
      closeDialog,
      confirmDialog,
      option,
    };
  })();

export const useConfirmDialog = () => {};
