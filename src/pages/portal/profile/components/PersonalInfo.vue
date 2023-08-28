<template>
  <q-card-section>
    <h6>Personal Info</h6>
    <q-form class="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
      <q-input filled v-model="userData.firstname" label="Firstname" />
      <q-input filled v-model="userData.middlename" label="Middlename" />
      <q-input filled v-model="userData.lastname" label="Lastname" />
      <q-btn
        label="Update"
        color="primary"
        @click="updateInfo"
        class="tw-self-end"
      />
    </q-form>
  </q-card-section>
</template>

<script>
import { Loading } from "quasar";
import { api } from "src/boot/axios";
import { Notify } from "src/utils";

export default {
  inject: ["user", "refreshUser"],

  data() {
    return {
      userData: JSON.parse(JSON.stringify(this.user)),
    };
  },
  methods: {
    updateInfo(e) {
      Loading.show();
      api
        .put(`/student/info`, this.userData)
        .then(() => {
          this.refreshUser();
          Notify.success("Personal Info updated successfully");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Loading.hide();
        });
    },
  },
};
</script>
