<template>
  <div>
    <div class="tw-container tw-mx-auto tw-flex tw-h-full tw-items-center">
      <div
        class="tw-w-full lg:tw-w-1/2 tw-flex-shrink-0 tw-gap-4 tw-text-center lg:tw-text-left"
      >
        <h3 class="tw-font-medium tw-text-center lg:tw-text-left">
          Welcome to
          <span class="tw-text-primary"
            >The Lord's Wisdom Academy of Caloocan</span
          >
          Student Portal
        </h3>
        <p class="tw-mt-8 tw-text-lg tw-font-light">
          The Purpose of the School is to provide quality education to enhance
          their intellectual, physical, social, emotional, spiritual and
          artistic growth. All of this is a preparation to their education life.
        </p>
        <q-btn
          class="tw-mt-8 tw-px-8"
          label="Register now"
          color="primary"
          rounded
          @click="register"
          size="lg"
        />
      </div>
      <div
        class="tw-w-1/2 tw-flex-shrink-0 tw-hidden lg:tw-flex tw-items-center tw-px-16"
      >
        <img src="/Online Class.svg" class="tw-w-full tw-h-auto" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import RegisterDialog from "../../register/RegisterDialog.vue";

const $q = useQuasar();
const register = () => {
  $q.dialog({
    component: RegisterDialog,
  });
};
</script>
