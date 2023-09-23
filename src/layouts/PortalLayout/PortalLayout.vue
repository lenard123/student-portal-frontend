<template>
  <div class="tw-bg-slate-50 tw-flex" v-if="!!store.user">
    <PortalSidebar
      class="tw-z-10 tw-max-w-[300px] tw-hidden lg:tw-block tw-h-screen tw-flex-shrink-0 tw-w-full tw-shadow"
    />
    <div class="tw-flex-grow tw-flex tw-flex-col">
      <header
        class="tw-z-10 tw-bg-white tw-h-16 tw-shadow tw-flex tw-items-center tw-px-4 md:tw-px-8"
      >
        <q-btn
          class="lg:tw-hidden"
          icon="menu"
          unelevated
          @click="sidebar = true"
        />
        <router-link
          :to="{ name: 'student:home' }"
          class="tw-flex tw-gap-4 tw-items-center tw-no-underline tw-text-slate-600"
        >
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          <div class="tw-text-base tw-font-bold">
            The Lord's Wisdom Academy<br />
            Of Caloocan
          </div>
        </router-link>
      </header>
      <main class="tw-flex tw-flex-col tw-h-full">
        <router-view />
      </main>
    </div>
    <q-dialog v-model="sidebar" position="left" fullHeight maximized>
      <PortalSidebar class="tw-bg-white tw-w-[300px]" />
    </q-dialog>
  </div>
</template>

<script>
import { LoadingBar } from "quasar";
import { useConfirmDialog } from "src/composables/useDialog";
import { useAuthStore } from "src/stores/auth";
import { computed, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PortalSidebar from "./PortalSidebar.vue";

export default {
  async beforeRouteEnter(to, from, next) {
    if (from.params.role == to.params.role) return next();

    const store = useAuthStore();
    if (store.user?.role == to.params.role) return next();

    LoadingBar.start();
    try {
      await store.fetchCurrentUser(to.params.role);
      next();
    } catch (err) {
      next({ name: "login" });
    } finally {
      LoadingBar.stop();
    }
  },
};
</script>
<script setup>
const store = useAuthStore();
const user = computed(() => store.user);
const route = useRoute();
const router = useRouter();
const { dialog } = useConfirmDialog();
const sidebar = ref(true);

provide("user", user);
provide("refreshUser", store.refetchCurrentUser);

const logout = () => {
  dialog({
    message: "Are you sure to logout?",
    async onSubmit() {
      await store.logout(route.params.role);
      router.push({ name: "login" });
    },
  });
};
</script>
