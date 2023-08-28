<template>
  <div class="tw-bg-slate-50 tw-flex" v-if="!!store.user">
    <aside
      class="tw-z-10 tw-max-w-[300px] tw-h-screen tw-bg-white tw-pt-8 tw-flex-shrink-0 tw-w-full tw-shadow"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-px-4">
        <q-avatar size="8rem">
          <img :src="user.avatar" />
        </q-avatar>
        <div class="tw-text-xl tw-mt-2">{{ user.fullname }}</div>
        <div class="tw-text-slate-500 tw-capitalize">{{ user.role }}</div>

        <q-btn
          :to="{ name: 'portal:profile' }"
          class="tw-w-full tw-mt-3"
          label="View Profile"
          color="primary"
        />
      </div>
      <q-list class="tw-mt-8">
        <q-item :to="{ name: 'portal:home' }" exact clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'portal:messages' }">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>Messages</q-item-section>
        </q-item>
        <!-- <q-item :to="{ name: 'student:schedules' }">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Calendar</q-item-section>
        </q-item> -->
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </aside>
    <div class="tw-flex-grow tw-flex tw-flex-col">
      <header
        class="tw-z-10 tw-bg-white tw-h-16 tw-shadow tw-flex tw-items-center tw-px-8"
      >
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
  </div>
</template>

<script>
import { LoadingBar } from "quasar";
import { useConfirmDialog } from "src/composables/useDialog";
import { useAuthStore } from "src/stores/auth";
import { computed, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

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
