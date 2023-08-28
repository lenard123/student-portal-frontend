<template>
  <q-card-section>
    <h6>Personal Info</h6>
    <q-form class="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
      <q-input filled v-model="userData.firstname" label="Firstname" />
      <q-input filled v-model="userData.middlename" label="Middlename" />
      <q-input filled v-model="userData.lastname" label="Lastname" />
      <q-btn type="submit" label="Update" color="primary" class="tw-self-end" />
    </q-form>
  </q-card-section>
</template>

<script>
export default {
  inject: ["user"],

  data() {
    return {
      userData: JSON.parse(JSON.stringify(this.user)),
    };
  },
};
</script>
