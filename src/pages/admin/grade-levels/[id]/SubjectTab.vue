<template>
  <q-table :columns="subjectColumns" :rows="gradeLevel.subjects">
    <template v-slot:top-left>
      <div class="tw-font-bold tw-text-lg">List of Sujects</div>
    </template>
    <template v-slot:top-right>
      <q-btn
        icon="add"
        @click="addSubject"
        unelevated
        label="Add Subject"
        color="primary"
      />
    </template>
  </q-table>
</template>

<script setup>
import { useQuasar } from "quasar";
import AddSubjectDialog from "./AddSubjectDialog.vue";

const props = defineProps(["gradeLevel"]);

const $q = useQuasar();
const subjectColumns = [
  { name: "name", label: "Subject", align: "left", field: "name" },
  { name: "action", label: "Action" },
];

const addSubject = () => {
  $q.dialog({
    component: AddSubjectDialog,
    componentProps: {
      gradeLevelId: props.gradeLevel.id,
      existingSubjects: props.gradeLevel.subjects,
    },
  });
};
</script>
