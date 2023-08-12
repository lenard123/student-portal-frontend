import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = (option) =>
  defineStore("app", () => {
    const departments = [
      { id: "pre-school", value: "Pre School" },
      { id: "elementary", value: "Elementary" },
      { id: "jhs", value: "Junior Highschool" },
      { id: "shs", value: "Senior Highschool" },
    ];

    return {
      departments,
      option,
    };
  })();
