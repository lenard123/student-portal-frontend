<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Students</div>
    <q-table
      class="tw-mt-4"
      :columns="columns"
      :loading="loading"
      :rows="students"
    >
      <template v-slot:top>
        <div
          class="tw-flex tw-items-center tw-justify-between tw-w-full tw-pt-4"
        >
          <q-select
            label="Department"
            class="tw-w-[270px] tw-ml-4"
            v-model="department"
            :options="appStore.departments"
            option-label="value"
          />
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td align="right">
          <q-btn
            :to="{ name: 'admin:students/info', params: { id: props.row.id } }"
            icon="visibility"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>
  </app-page-container>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { onMounted, ref, watch } from "vue";

const columns = [
  { name: "name", label: "Name", align: "left", field: "fullname" },
  {
    label: "Student ID",
    field: "student_id",
  },
  {
    label: "Email",
    field: "email",
    align: "left",
  },
  {
    name: "grade_level",
    label: "Grade",
    field: "current_registration",
    format: (val) => val.grade_level.name,
    align: "center",
  },
  {
    name: "section",
    label: "Section",
    field: "current_registration",
    format: (val) => val.section.name,
  },
  { name: "action", label: "Action" },
];

const appStore = useAppStore();
const department = ref();
const academicYearStore = useAcademicYearStore();
const loading = ref(false);
const students = ref([]);

const fetchStudents = async (id) => {
  loading.value = true;
  const { data } = await api
    .get("/students/?academic_year_id=" + id)
    .finally(() => {
      loading.value = false;
    });
  students.value = data;
};

watch(department, (value) => {
  fetchStudents(academicYearStore.activeAcademicYear[value.id].id);
});

onMounted(() => {
  department.value = appStore.departments[0];
});
</script>
