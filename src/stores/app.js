import { defineStore } from "pinia";
import { Loading } from "quasar";
import { ref } from "vue";

export const useAppStore = (option) =>
  defineStore("app", () => {
    const confirmDialog = ref(null);

    const closeDialog = () => {
      confirmDialog.value = null;
    };

    const showDialog = (data) => {
      confirmDialog.value = data;
      confirmDialog.value.loading = false;
      confirmDialog.value.submit = async function () {
        confirmDialog.value.loading = true;
        try {
          await data.onSubmit();
          closeDialog();
        } catch (err) {
        } finally {
          confirmDialog.value.loading = true;
        }
      };
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
