<template>
  <div class="tw-bg-white tw-pt-8">
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
      <q-item clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useConfirmDialog } from "src/composables/useDialog";
import { useAuthStore } from "src/stores/auth";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useAuthStore();
const { dialog } = useConfirmDialog();
const router = useRouter();
const route = useRoute();
const user = computed(() => store.user);

const logout = () => {
  dialog({
    message: "Are you sure to logout?",
    async onSubmit() {
      await store.logout(route.params.role);
      
      if (route.params.role == 'student') {
        router.push({ name: "student-login" });
      } else {
        router.push({ name: "login" });
      }
      
    },
  });
};
</script>
