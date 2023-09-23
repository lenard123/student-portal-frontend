<template>
  <div class="tw-bg-white">
    <div class="tw-p-4 tw-flex tw-bg-slate-50 tw-gap-4 tw-py-6">
      <q-avatar>
        <img
          src="https://avatars.dicebear.com/api/initials/admin+example.svg"
          class="wrapper-image"
        />
      </q-avatar>
      <div class="tw-flex-grow">
        <div class="tw-text-base">{{ store.fullname }}</div>
        <q-separator class="tw-my-2" />
        <div class="tw-flex tw-gap-2">
          <q-btn unelevated icon="person" color="primary" />
          <q-btn unelevated icon="lock" color="primary" />
          <q-btn
            @click="handleLogout"
            unelevated
            icon="logout"
            color="primary"
          />
        </div>
      </div>
    </div>
    <q-separator />
    <div class="tw-flex-grow">
      <q-list separator>
        <q-item :to="{ name: 'admin:announcements' }" exact clickable>
          <q-item-section avatar>
            <q-icon name="campaign" />
          </q-item-section>
          <q-item-section>Announcements</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin:threads' }" clickable>
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>Messages</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin:faculties' }" clickable>
          <q-item-section avatar>
            <q-icon name="mdi-human-male-board" />
          </q-item-section>
          <q-item-section>Faculty</q-item-section>
        </q-item>

        <q-item clickable :to="{ name: 'admin:pre-enrollment' }">
          <q-item-section avatar>
            <q-icon name="mdi-account-school" />
          </q-item-section>
          <q-item-section>Pre-Enrollment</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin:grade-levels' }" clickable>
          <q-item-section avatar>
            <q-icon name="trending_up" />
          </q-item-section>
          <q-item-section>Grade Levels</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin:sections' }" clickable>
          <q-item-section avatar>
            <q-icon name="class" />
          </q-item-section>
          <q-item-section>Classes</q-item-section>
        </q-item>
        <q-item :to="{ name: 'admin:subjects' }" clickable>
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>
          <q-item-section>Subjects</q-item-section>
        </q-item>
        <q-expansion-item icon="settings" label="Settings">
          <q-list>
            <q-item
              :to="{ name: 'admin:school-year' }"
              :inset-level="1"
              clickable
            >
              <q-item-section>
                <q-item-label>School Year</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { useConfirmDialog } from "src/composables/useDialog";
import { ROLE_ADMIN, useAuthStore } from "src/stores/auth";
import { Notify } from "src/utils";
import { useRouter } from "vue-router";

const store = useAuthStore();
const { dialog } = useConfirmDialog();
const router = useRouter();

const handleLogout = () => {
  dialog({
    message: "Are you sure to logout?",
    onSubmit: async () => {
      await store.logout(ROLE_ADMIN);
      router.push({ name: "login" });
      Notify.success("Logout successfully");
    },
  });
};
</script>
