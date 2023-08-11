<template>
  <RegistrationList v-if="authStore.user.current_registration == null" />
  <SubjectList v-else />
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import RegistrationList from "./components/RegistrationList.vue";
import SubjectList from "./components/SubjectList.vue";

const authStore = useAuthStore();
</script>
