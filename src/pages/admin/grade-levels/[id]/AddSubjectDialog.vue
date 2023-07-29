<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-text-xl tw-font-bold">
          Add Subject
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-select
            v-model="selected"
            :loading="subjectStore.loading"
            :options="subjects"
            option-label="name"
            filled
            label="Subject"
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
import { Loading, useDialogPluginComponent } from "quasar";
import { useGradeLevel } from "src/stores/grade-levels";
import { useSubjectsStore } from "src/stores/subjects";
import { Notify } from "src/utils";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["gradeLevelId", "existingSubjects"]);
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const subjectStore = useSubjectsStore();
const store = useGradeLevel(props.gradeLevelId);
const selected = ref(null);

const subjects = computed(() => {
  return subjectStore.subjects.filter((subject) => {
    if (
      props.existingSubjects.some(
        (existingSubject) => existingSubject.id == subject.id
      )
    )
      return false;
    return subject.grade_level_id == props.gradeLevelId;
  });
});

const handleSubmit = async () => {
  Loading.show();
  try {
    await store.addSubject(selected.value.id);
    onDialogHide();
    Notify.success("Subject added successfully");
  } finally {
    Loading.hide();
  }
};

onMounted(() => {
  subjectStore.fetchAll();
});
</script>
