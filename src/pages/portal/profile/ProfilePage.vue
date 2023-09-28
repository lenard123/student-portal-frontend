<template>
  <app-page-container>
    <div class="tw-text-2xl tw-font-bold">User Profile</div>

    <div
      class="tw-mt-8 tw-gap-4 tw-flex tw-flex-col md:tw-flex-row tw-items-start tw-w-full"
    >
      <ProfileInfoCard class="tw-w-full md:tw-w-1/4 tw-flex-shrink-0" />
      <q-card class="flex-grow tw-w-full">
        <q-tabs v-model="tab" align="left">
          <q-tab name="basic-info" label="Basic Info" />
          <q-tab name="credential" label="Credential" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="basic-info" class="tw-p-0">
            <PersonalInfo />
            <OtherInfo v-if="user.role == ROLE_STUDENT" />
          </q-tab-panel>
          <q-tab-panel name="credential" class="tw-p-0">
            <ChangePassword />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </app-page-container>
</template>
<script setup>
import { ROLE_STUDENT } from "src/stores/auth";
import { inject, ref } from "vue";
import ChangePassword from "./components/ChangePassword.vue";
import OtherInfo from "./components/OtherInfo.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";

const user = inject("user");
const tab = ref("basic-info");
</script>
