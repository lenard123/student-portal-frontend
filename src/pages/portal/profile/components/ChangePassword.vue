<template>
  <q-card-section>
    <h6>Change Password</h6>
    <q-form class="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
      <q-input label="Old Password" filled v-model="password" />
      <q-input label="New Password" filled v-model="new_password" />
      <q-input
        label="Confirm New Password"
        filled
        v-model="new_password_confirmation"
      />
      <q-btn type="submit" label="Update" color="primary" class="tw-self-end" />
    </q-form>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    };
  },
};
</script>
