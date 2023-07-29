<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-font-bold tw-text-xl">
          Add Subject
        </q-card-section>
        <q-separator />
        <q-card-section class="tw-flex tw-flex-col tw-gap-4">
          <q-select
            filled
            label="Grade Level"
            :options="gradeLevels"
            v-model="level"
            :loading="gradeLevelStore.loading"
            option-label="name"
          />
          <q-select
            filled
            label="Select Subject"
            :options="subjects"
            v-model="subject[level?.id]"
            :loading="subjectsStore.loading"
            option-label="name"
          />
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
import { Loading } from "quasar";
import { useDialogPluginComponent } from "quasar";
import { useFaculty } from "src/stores/faculty";
import { useGradeLevelsStore } from "src/stores/grade-levels";
import { useSubjectsStore } from "src/stores/subjects";
import { Notify } from "src/utils";
import { computed, onMounted, reactive, ref } from "vue";

const props = defineProps(["department", "faculty_id"]);
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const level = ref(null);
const subject = reactive({});
const gradeLevelStore = useGradeLevelsStore();
const subjectsStore = useSubjectsStore();
const store = useFaculty(props.faculty_id);
const gradeLevels = computed(
  () => gradeLevelStore.departmentGradeLevels[props.department]
);
const subjects = computed(() =>
  subjectsStore.subjects.filter(
    (subject) => subject.grade_level_id == level.value?.id
  )
);

const handleSubmit = async () => {
  try {
    Loading.show();
    await store.addSubject({ subject_id: subject[level.value.id]?.id });
    Notify.success("Subject added successfully");
    onDialogHide();
  } finally {
    Loading.hide();
  }
};

onMounted(() => {
  gradeLevelStore.fetchAll();
  subjectsStore.fetchAll();
});
</script>
