<template>
  <app-page-container v-if="store.initialized">
    <div class="tw-text-4xl tw-font-bold">Class Schedules</div>
    <q-table
      class="tw-mt-8"
      :columns="columns"
      :rows="store.section.schedules"
      separator="cell"
    >
      <template v-slot:top-left>
        <div class="tw-text-xl tw-font-bold">{{ store.section.name }}</div>
      </template>

      <template v-slot:top-right>
        <q-btn
          @click="addSchedule"
          unelevated
          color="primary"
          label="Add Subject"
          icon="add"
        />
      </template>
      <template v-slot:body-cell-schedule="{ row }">
        <q-td align="center" auto-width>
          <div class="tw-flex tw-flex-col">
            <q-chip
              :label="`${schedule.day} ${schedule.start}-${schedule.end} ${schedule.room}`"
              size="sm"
              v-for="schedule in row.schedules"
              v-show="schedule.start != schedule.end"
              :key="schedule.day"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </app-page-container>
</template>

<script setup>
import { LoadingBar, useQuasar } from "quasar";
import { useSectionInfo } from "src/stores/sections";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import AddSubjectDialog from "./AddSubjectDialog.vue";
const route = useRoute();
const store = useSectionInfo(route.params.id);

const getSubject = (id) => {
  return store.section.grade_level.subjects.find((subj) => subj.id == id);
};

const getFaculty = (subject_id, faculty_id) => {
  return getSubject(subject_id).faculties.find(
    (faculty) => faculty.id == faculty_id
  );
};

const columns = [
  {
    name: "subject",
    label: "Subject",
    align: "left",
    field: (row) => getSubject(row.subject_id).name,
  },
  {
    name: "faculty",
    label: "Teacher",
    field: (row) => getFaculty(row.subject_id, row.faculty_id).fullname,
  },
  { name: "schedule", label: "Schedule", align: "center" },
  { name: "action", label: "Action" },
];

const $q = useQuasar();
const addSchedule = () => {
  $q.dialog({
    component: AddSubjectDialog,
    componentProps: {
      subjects: store.section.grade_level.subjects,
      section_id: route.params.id,
    },
  }).onOk(() => {
    LoadingBar.start();
    store.fetch().finally(() => LoadingBar.stop());
  });
};

onMounted(() => {
  LoadingBar.start();
  store.fetch().finally(() => LoadingBar.stop());
});
</script>
