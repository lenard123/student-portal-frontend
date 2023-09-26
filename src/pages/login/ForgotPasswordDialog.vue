<template>
  <q-card-section>
    <q-input
      v-model="email"
      type="email"
      label="Enter your email here"
      filled
    />
  </q-card-section>
</template>

<script setup>
import { api } from "src/boot/axios";
import { Notify } from "src/utils";
import { ref } from "vue";

const email = ref("");

defineExpose({
  title: "Forgot Password",
  async onSubmit() {
    await api.post("/forgot-password", { email: email.value });
    Notify.success("Please check your email for further instructions.");
  },
});
</script>
