<template>
  <RegistrationList v-if="user.current_registration == null" />
  <SubjectList v-else />
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";
import RegistrationList from "./components/RegistrationList.vue";
import SubjectList from "./components/SubjectList.vue";
import { computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user ?? {});
</script>
