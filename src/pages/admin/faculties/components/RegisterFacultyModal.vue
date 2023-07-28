<template>
  <app-dialog
    :model-value="modelValue"
    title="Register new Faculty"
    :cancelButton="{ label: 'Cancel' }"
    :submitButton="{ label: 'Submit' }"
    @cancel="closeDialog"
    @submit="handleSubmit"
  >
    <q-input required v-model="data.firstname" label="Firstname" filled dense />
    <q-input
      class="tw-mt-4"
      v-model="data.middlename"
      label="Middlename"
      filled
      dense
    />
    <q-input
      required
      class="tw-mt-4"
      v-model="data.lastname"
      label="Lastname"
      filled
      dense
    />
    <q-input
      type="email"
      required
      class="tw-mt-4"
      v-model="data.email"
      label="Email"
      filled
      dense
    />

    <q-input
      type="password"
      required
      v-model="data.password"
      class="tw-mt-4"
      label="Password"
      filled
      dense
    />
    <q-input
      required
      type="password"
      v-model="data.password_confirmation"
      class="tw-mt-4"
      label="Confirm Password"
      filled
      dense
    />
    <q-select
      required
      class="tw-mt-4"
      label="Department"
      v-model="data.department"
      :options="appStore.departments"
      option-label="value"
      filled
      dense
    />
  </app-dialog>
</template>

<script setup>
import { Loading } from "quasar";
import AppDialog from "src/components/AppDialog.vue";
import { useAnnouncementStore } from "src/stores/announcements";
import { useAppStore } from "src/stores/app";
import { useFacultyStore } from "src/stores/faculty";
import { Notify } from "src/utils";
import { reactive } from "vue";

const appStore = useAppStore();
const store = useFacultyStore();
const emits = defineEmits(["update:modelValue"]);
defineProps(["modelValue"]);

const data = reactive({
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  password: "",
  password_confirmation: "",
  department: "",
});

const closeDialog = () => {
  emits("update:modelValue", false);
  data.firstname = "";
  data.middlename = "";
  data.lastname = "";
  data.email = "";
  data.password = "";
  data.password_confirmation = "";
  data.department = "";
};

const handleSubmit = async () => {
  Loading.show();
  await store
    .registerFaculty({ ...data, department: data.department.id })
    .finally(() => {
      Loading.hide();
    });
  Notify.success("Faculty registed successfully");
  closeDialog();
};
</script>
