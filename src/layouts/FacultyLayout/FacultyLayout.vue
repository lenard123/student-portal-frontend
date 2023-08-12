<template>
  <MainLayout :user="user">
    <q-list class="tw-mt-8">
      <q-item :to="{ name: 'faculty:home' }" exact clickable>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>Home</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="forum" />
        </q-item-section>
        <q-item-section>Messages</q-item-section>
      </q-item>
      <q-item :to="{ name: 'student:schedules' }">
        <q-item-section avatar>
          <q-icon name="event" />
        </q-item-section>
        <q-item-section>Calendar</q-item-section>
      </q-item>
      <q-item clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </MainLayout>
</template>

<script setup>
import { LoadingBar } from "quasar";
import { useConfirmDialog } from "src/composables/useDialog";
import { ROLE_FACULTY, useAuthStore } from "src/stores/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "../MainLayout.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user ?? {});
const { dialog } = useConfirmDialog();
const router = useRouter();
const logout = () => {
  dialog({
    message: "Are you sure to logout?",
    async onSubmit() {
      await authStore.logout(ROLE_FACULTY);
      router.push({ name: "login" });
    },
  });
};
</script>

<script>
export default {
  async beforeRouteEnter(to, from, next) {
    const store = useAuthStore();
    LoadingBar.start();
    try {
      if (store.user?.role != ROLE_FACULTY)
        await store.fetchCurrentUser(ROLE_FACULTY);
      next();
    } catch (error) {
      next({ name: "login" });
    } finally {
      LoadingBar.stop();
    }
  },
};
</script>
