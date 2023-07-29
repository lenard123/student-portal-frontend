<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Subjects</div>
    <div class="tw-mt-8">
      <q-btn
        @click="addSubject"
        rounded
        color="primary"
        label="Add Subject"
        icon="add"
      />
    </div>
    <q-table class="tw-mt-4" :columns="columns" :rows="subjects">
      <template v-slot:top>
        <q-tabs
          v-model="department"
          class="-tw-m-3 tw-text-gray-500"
          active-class="tw-text-gray-700"
        >
          <q-tab
            :name="department.id"
            :label="department.value"
            v-for="department in appStore.departments"
            :key="department.id"
          />
        </q-tabs>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAppStore } from "src/stores/app";
import { useSubjectsStore } from "src/stores/subjects";
import { computed, onMounted, ref } from "vue";
import AddSubjectDialog from "./components/AddSubjectDialog.vue";

const $q = useQuasar();
const appStore = useAppStore();
const store = useSubjectsStore();
const department = ref(appStore.departments[0].id);
const subjects = computed(() =>
  store.subjects.filter(
    (subj) => subj.grade_level.department == department.value
  )
);
const columns = [
  { name: "name", label: "Subject", align: "left", field: "name" },
  { name: "level", label: "Grade Level", field: (row) => row.grade_level.name },
  { name: "action", label: "Action" },
];

const addSubject = () => {
  $q.dialog({
    component: AddSubjectDialog,
    componentProps: {
      department: appStore.departments.findIndex(
        (dept) => dept.id == department.value
      ),
    },
  });
};

onMounted(() => {
  store.fetchAll();
});
</script>
