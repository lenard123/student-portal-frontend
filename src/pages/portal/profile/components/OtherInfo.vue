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
      <q-btn type="submit" label="Update" color="primary" class="tw-self-end" />
    </q-form>
  </q-card-section>
</template>
<script>
export default {
  inject: ["user"],
  data() {
    return {
      userModel: JSON.parse(JSON.stringify(this.user)),
    };
  },
};
</script>
