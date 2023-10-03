<template>
  <div class="tw-h-screen tw-flex tw-flex-col">
    <div
      class="tw-bg-primary tw-h-16 tw-text-white tw-flex tw-items-center tw-px-8 tw-flex-shrink-0"
    >
      <router-link
        :to="{ name: 'home' }"
        class="tw-flex tw-gap-4 tw-items-center tw-text-white tw-no-underline"
      >
        <q-avatar>
          <img src="/logo.png" />
        </q-avatar>
        <div class="tw-text-base tw-font-bold">
          The Lord's Wisdom Academy<br />
          Of Caloocan
        </div>
      </router-link>
    </div>
    <div class="tw-flex-grow tw-bg-red-100 background tw-py-8">
      <div
        class="tw-w-full tw-max-w-[90vw] sm:tw-max-w-[80vw] xl:tw-max-w-[60vw] tw-mx-auto tw-h-full tw-rounded-3xl tw-shadow-md tw-overflow-hidden tw-grid tw-grid-cols-1 md:tw-grid-cols-2"
      >
        <div
          class="tw-bg-primary hidden md:tw-flex tw-flex-col tw-items-center tw-justify-end tw-px-4"
        >
          <div
            class="tw-text-white tw-flex-grow tw-font-light tw-text-3xl text-center tw-flex tw-items-center"
          >
            The Lord's Wisdom Academy Of Caloocan
          </div>
          <img class="tw-w-full" src="./assets/undraw_education_f8ru.svg" />
        </div>
        <q-form
          @submit="handleSubmit"
          class="tw-bg-white/80 tw-px-4 tw-flex tw-flex-col tw-justify-center"
        >
          <div class="tw-font-bold tw-text-xl">Login to your Account</div>
          <q-input
            v-model="data.email"
            class="tw-mt-4"
            outlined
            label="Email"
            type="email"
            maxlength="30"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            v-model="data.password"
            class="tw-mt-4"
            outlined
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            maxlength="30"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn type="submit" class="tw-mt-4" color="primary" label="Submit" />
          <q-btn
            @click="forgotPassword"
            flat
            class="tw-mt-4"
            label="Forgot Password?"
          />
        </q-form>
      </div>
    </div>
    <div class="tw-bg-gray-800 tw-h-6 tw-text-white tw-flex tw-items-center">
      <div class="tw-container tw-mx-auto tw-px-8">
        Copyright © 2023 All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup>
import { Loading } from "quasar";
import useDialog from "src/composables/useDialog";
import {
  ROLE_ADMIN,
  ROLE_FACULTY,
  ROLE_STUDENT,
  useAuthStore,
} from "src/stores/auth";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ForgotPasswordDialog from "./ForgotPasswordDialog.vue";

const route = useRoute();
const data = reactive({
  role: "Student",
  email: route.query.email,
  password: "",
});
const isPwd = ref(true);

const { login } = useAuthStore();
const router = useRouter();

const handleSubmit = () => {
  Loading.show();
  login({ ...data, role: data.role.toLowerCase() })
    .then((user) => {
      switch (user.role) {
        case ROLE_ADMIN:
          router.push({ name: "admin:announcements" });
          break;
        default:
          router.push({ name: "portal:home", params: { role: user.role } });
      }
    })
    .finally(() => {
      Loading.hide();
    });
};

const { dialog } = useDialog();
const forgotPassword = () => {
  dialog({
    component: ForgotPasswordDialog,
    componentProps: {
      email: data.email,
    },
  });
};
</script>

<style scoped>
.background {
  background-image: url("./assets/background.webp");
  background-size: cover;
}
</style>
