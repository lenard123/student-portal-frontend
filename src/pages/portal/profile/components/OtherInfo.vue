<template>
  <q-card-section>
    <h6>Other Info</h6>
    <q-form class="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
      <q-input
        filled
        type="date"
        v-model="userModel.birthday"
        label="Birthday"
      />
      <q-input filled v-model="userModel.civil_status" label="Civil Status" />
      <q-input filled v-model="userModel.birthplace" label="Birthplace" />
      <q-input filled v-model="userModel.religion" label="Religion" />
      <q-input filled v-model="userModel.gender" label="Gender" />
      <q-input filled v-model="userModel.nationality" label="Nationality" />
      <q-btn
        label="Update"
        color="primary"
        @click="updateOtherInfo"
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
      userModel: JSON.parse(JSON.stringify(this.user.info)),
    };
  },
  methods: {
    updateOtherInfo(e) {
      Loading.show();
      api
        .put(`/student/other-info`, this.userModel)
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
