<template>
  <div class="tw-h-screen tw-flex tw-flex-col">
    <div
      class="tw-bg-primary tw-h-16 tw-text-white tw-flex tw-items-center tw-px-8"
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
        class="tw-w-full tw-max-w-[60vw] tw-mx-auto tw-h-full tw-rounded-3xl tw-shadow-md tw-overflow-hidden tw-grid tw-grid-cols-2"
      >
        <div
          class="tw-bg-primary tw-flex tw-flex-col tw-items-center tw-justify-end tw-px-4"
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
          <q-select
            v-model="data.role"
            class="tw-mt-8 tw-capitalize"
            popup-content-class="tw-capitalize"
            standout
            :options="['student', 'faculty', 'admin']"
            label="Login as"
          />
          <q-input
            v-model="data.email"
            class="tw-mt-4"
            outlined
            label="Email"
            type="email"
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
import { ROLE_ADMIN, ROLE_STUDENT, useAuthStore } from "src/stores/auth";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
        case ROLE_STUDENT:
          router.push({ name: "student:home" });
          break;
      }
    })
    .finally(() => {
      Loading.hide();
    });
};
</script>

<style scoped>
.background {
  background-image: url("./assets/background.webp");
  background-size: cover;
}
</style>
