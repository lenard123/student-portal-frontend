<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Faculties</div>

    <q-table
      class="tw-mt-8"
      :columns="columns"
      :rows="store.faculties"
      row-key="id"
      :filter="department"
      :filter-method="
        (rows, terms) =>
          rows.filter((item) => terms == null || item.department == terms.id)
      "
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
            clearable
          />
          <q-btn
            @click="addFaculty = true"
            label="Register faculty"
            color="primary"
            unelevated
          />
        </div>
      </template>
      <template v-slot:top-right> </template>
      <template v-slot:body-cell-name="{ row }">
        <q-td>
          <div class="tw-flex tw-gap-4 tw-items-center">
            <q-avatar>
              <img :src="row.avatar" />
            </q-avatar>
            <div>
              <div class="tw-font-bold">{{ row.fullname }}</div>
              <div>{{ row.email }}</div>
            </div>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="{ row }">
        <q-td align="right">
          <q-btn
            :to="{ name: 'admin:faculties/info', params: { id: row.id } }"
            icon="visibility"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <RegisterFacultyModal v-model="addFaculty" />
</template>

<script setup>
import { useFacultyStore } from "src/stores/faculty";
import { onMounted, ref } from "vue";
import { useAppStore } from "src/stores/app";
import RegisterFacultyModal from "./components/RegisterFacultyModal.vue";

const addFaculty = ref(false);

const store = useFacultyStore();
const appStore = useAppStore();
const department = ref(null);

const columns = [
  { name: "name", label: "Name", align: "left" },
  {
    name: "department",
    label: "Department",
    field: "department_label",
    align: "center",
  },
  { name: "status", label: "Status" },
  { name: "action", label: "Action" },
];

onMounted(() => {
  store.fetchFaculties();
});
</script>
