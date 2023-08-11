<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-h-16 tw-bg-primary tw-text-white">
          <div class="tw-text-2xl">Register</div>
        </q-card-section>
        <q-stepper ref="stepper" v-model="step" animated>
          <q-step prefix="1" :name="1" :done="step > 1" title="">
            <div class="tw-text-center">
              Please use one account only. This page is for student with NO
              PORTAL Account yet. If ever you forgot your account you can use
              password recovery or contact your teacher to recover your account.
            </div>
          </q-step>
          <q-step prefix="2" :name="2" :done="step > 2" title="">
            <div class="tw-flex tw-flex-col tw-gap-4">
              <q-input
                v-model="data.firstname"
                dense
                filled
                label="Firstname"
                required
              />
              <q-input
                v-model="data.middlename"
                dense
                filled
                label="Middlename"
              />
              <q-input
                v-model="data.lastname"
                dense
                filled
                label="Lastname"
                required
              />
              <q-input
                v-model="data.email"
                dense
                filled
                label="Email"
                required
                type="email"
              />
              <q-input
                v-model="data.contact_number"
                dense
                filled
                label="Contact Number"
                required
              />
              <q-select
                :options="appStore.departments"
                option-label="value"
                option-value="id"
                emit-value
                v-model="data.department"
                dense
                filled
                label="Department"
                required
              >
                <template v-slot:selected-item>
                  <span>{{
                    appStore.departments.find((d) => d.id == data.department)
                      ?.value
                  }}</span>
                </template>
              </q-select>
              <div class="tw-grid tw-grid-cols-2 tw-gap-3">
                <q-input
                  v-model="data.password"
                  dense
                  filled
                  label="Password"
                  required
                  type="password"
                />
                <q-input
                  v-model="data.password_confirmation"
                  dense
                  filled
                  label="Confirm Password"
                  required
                  type="password"
                />
              </div>
            </div>
          </q-step>
          <q-step prefix="3" :name="3" title="">
            <div class="text-center">
              <div class="tw-font-bold tw-text-2xl">
                Please verify your email
              </div>
              <div class="tw-mt-2 tw-text-sm tw-text-gray-500">
                Enter the 6 digit code we sent to your email address to verify
                your student account.
              </div>

              <q-input
                outlined
                readonly
                :model-value="data.email"
                class="tw-mt-4"
                label="Email"
              />

              <q-input class="tw-mt-4" outlined type="number">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>

                <template v-slot:append>
                  <q-btn
                    :label="throttle > 0 ? throttle : 'Resend'"
                    flat
                    type="text"
                    :loading="sending"
                    @click="resend"
                  />
                </template>
              </q-input>
            </div>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="tw-flex tw-justify-end tw-gap-4">
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
              />
              <q-btn
                type="submit"
                color="primary"
                :label="step === 3 ? 'Submit' : 'Next'"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { useAppStore } from "src/stores/app";
import { useOtp, useStudentsStore } from "src/stores/student";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const { loading: sending, throttle, sendOtp, resend } = useOtp();
const studentStore = useStudentsStore();
const router = useRouter();
const step = ref(2);
const stepper = ref(null);
const appStore = useAppStore();
const data = reactive({
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  contact_number: "",
  department: "",
  password: "",
  password_confirmation: "",
});

const handleSubmit = () => {
  switch (step.value) {
    case 1: {
      step.value++;
      return;
    }

    case 2: {
      Loading.show();
      sendOtp({ ...data })
        .then(() => {
          step.value++;
        })
        .finally(() => {
          Loading.hide();
        });
      return;
    }

    case 3: {
      Loading.show();
      studentStore
        .register({ ...data })
        .then(() => {
          onDialogOK();
          router.push({ name: "login", query: { email: data.email } });
        })
        .finally(() => {
          Loading.hide();
        });
    }
  }
};
</script>
