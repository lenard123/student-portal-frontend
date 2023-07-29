<template>
  <q-dialog ref="dialogRef">
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-font-bold tw-text-xl"
          >Add New School Year</q-card-section
        >
        <q-separator />
        <q-card-section class="tw-flex tw-flex-col tw-gap-4">
          <q-select
            v-model="department"
            :options="appStore.departments"
            option-label="value"
            label="Department"
            filled
          />
          <q-input v-model="name" label="School Year" filled />
        </q-card-section>
        <q-card-section class="tw-flex tw-justify-end tw-gap-4">
          <q-btn @click="onDialogHide" color="gray" flat label="Cancel" />
          <q-btn type="submit" color="primary" label="Submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { Notify } from "src/utils";
import { ref } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const department = ref(null);
const name = ref("");
const appStore = useAppStore();
const store = useAcademicYearStore();

const handleSubmit = async () => {
  Loading.show();
  try {
    await store.create({
      department: department.value?.id,
      name: name.value,
    });
    onDialogHide();
    Notify.success("School year successfully added");
  } finally {
    Loading.hide();
  }
};
</script>
