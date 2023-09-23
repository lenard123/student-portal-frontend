<template>
  <div class="tw-flex tw-flex-col tw-h-screen">
    <header
      class="tw-bg-primary tw-h-16 tw-relative tw-shadow-lg tw-flex tw-items-center tw-px-4 tw-flex-shrink-0"
    >
      <div
        class="tw-w-full tw-mx-auto tw-text-white tw-text-xl tw-flex tw-gap-1 tw-items-center"
      >
        <q-btn
          class="lg:tw-hidden"
          icon="menu"
          unelevated
          @click="sidebar = true"
        />
        <div>The Lord's Wisdom Academy Of Caloocan</div>
      </div>
    </header>

    <div class="tw-flex-grow tw-flex tw-min-h-0 tw-px-[5px] wrapper">
      <AdminSidebar
        class="tw-w-[300px] tw-relative tw-flex-shrink-0 tw-shadow-lg tw-hidden lg:tw-flex tw-flex-col"
      />
      <main
        class="tw-flex-grow tw-bg-slate-100 tw-overflow-y-scroll tw-flex tw-flex-col"
      >
        <router-view />
      </main>
    </div>
    <q-dialog v-model="sidebar" position="left" fullHeight maximized>
      <AdminSidebar />
    </q-dialog>
  </div>
</template>

<script setup>
import { LoadingBar } from "quasar";
import { ROLE_ADMIN, useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import AdminSidebar from "./AdminSidebar.vue";

const sidebar = ref(false);
</script>

<script>
export default {
  async beforeRouteEnter(_to, _from, next) {
    const store = useAuthStore();
    LoadingBar.start();
    try {
      if (store.user?.role != ROLE_ADMIN)
        await store.fetchCurrentUser(ROLE_ADMIN);
      next();
    } catch (err) {
      next({ name: "login" });
    } finally {
      LoadingBar.stop();
    }
  },
};
</script>
