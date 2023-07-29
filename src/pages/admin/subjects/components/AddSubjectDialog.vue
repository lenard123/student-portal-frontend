<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-font-bold tw-text-xl"
          >Add Subject</q-card-section
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
          <q-select
            v-model="gradeLevel[department.id]"
            :options="gradeLevelStore.departmentGradeLevels[department.id]"
            option-label="name"
            label="Grade Level"
            filled
            :loading="gradeLevelStore.loading"
          />
          <q-input filled label="Subject" v-model="name" />
        </q-card-section>
        <q-separator />
        <q-card-section class="tw-flex tw-justify-end tw-gap-4">
          <q-btn
            label="Cancel"
            class="text-gray"
            flat
            @click="onDialogCancel"
          />
          <q-btn type="submit" label="Submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { useAppStore } from "src/stores/app";
import { useGradeLevelsStore } from "src/stores/grade-levels";
import { useSubjectsStore } from "src/stores/subjects";
import { Notify } from "src/utils";
import { onMounted, reactive, ref } from "vue";

const props = defineProps(["department"]);

const appStore = useAppStore();
const gradeLevelStore = useGradeLevelsStore();
const store = useSubjectsStore();
const department = ref(appStore.departments[props.department]);
const gradeLevel = reactive({});
const name = ref("");

const { dialogRef, onDialogCancel } = useDialogPluginComponent();

onMounted(() => {
  gradeLevelStore.fetchAll();
});

const handleSubmit = async () => {
  Loading.show();
  try {
    await store.createSubject({
      grade_level_id: gradeLevel[department.value.id]?.id,
      name: name.value,
    });
    onDialogCancel();
    Notify.success("Subject added successfully");
  } finally {
    Loading.hide();
  }
};
</script>
