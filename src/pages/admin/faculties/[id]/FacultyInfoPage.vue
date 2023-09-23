<template>
  <app-page-container v-if="store.initialize">
    <div class="tw-text-4xl tw-font-bold">Faculty Information</div>
    <div class="tw-mt-8 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-start">
      <q-card>
        <img :src="store.faculty.avatar" />
        <q-card-section>
          <div class="tw-text-xl tw-font-bold">
            {{ store.faculty.fullname }}
          </div>
          <div class="tw-text-gray-600">{{ store.faculty.email }}</div>
        </q-card-section>
      </q-card>
      <q-table
        class="tw-col-span-2"
        :columns="columns"
        :rows="store.faculty.subjects"
      >
        <template v-slot:top-left>
          <div class="tw-text-xl tw-font-bold">Subjects</div>
        </template>
        <template v-slot:top-right>
          <q-btn
            @click="addSubject"
            unelevated
            label="Add Subject"
            icon="add"
            color="primary"
          />
        </template>
      </q-table>
    </div>
  </app-page-container>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useFaculty } from "src/stores/faculty";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import AddSubjectDialog from "./AddSubjectDialog.vue";

const route = useRoute();
const store = useFaculty(route.params.id);

const columns = [
  { name: "name", label: "Subject", align: "left", field: "name" },
  {
    name: "grade_level",
    label: "Grade Level",
    field: (row) => row.grade_level.name,
  },
  { name: "action", label: "Action" },
];
const $q = useQuasar();
const addSubject = () => {
  $q.dialog({
    component: AddSubjectDialog,
    componentProps: {
      department: store.faculty.department,
      faculty_id: store.faculty.id,
    },
  });
};

onMounted(() => {
  store.fetch();
});
</script>
