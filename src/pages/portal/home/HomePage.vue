<template>
  <RegistrationListPage
    v-if="user.role == ROLE_STUDENT && user.current_registration == null"
  />
  <SubjectListPage v-else />
</template>

<script setup>
import RegistrationListPage from "./components/RegistrationListPage.vue";
import SubjectListPage from "./components/SubjectListPage.vue";
import { ROLE_STUDENT, useAuthStore } from "src/stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
