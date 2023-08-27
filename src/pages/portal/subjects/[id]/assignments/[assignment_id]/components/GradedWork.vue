<template>
  <q-table :rows="students" :columns="columns">
    <template v-slot:body-cell-actions="props">
      <q-td>
        <q-btn
          @click="viewWork(props.row)"
          label="View"
          icon="visibility"
          color="primary"
          flat
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useFileViewerDialog } from "src/composables/useDialog";

const props = defineProps(["students"]);

const columns = [
  {
    name: "name",
    label: "Name",
    field: "fullname",
    align: "left",
    sortable: true,
  },
  {
    name: "grade",
    label: "Grade",
    field: "work",
    align: "left",
    sortable: true,
    format: (work) => `${work.grade}/100`,
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    align: "left",
    sortable: true,
  },
];

const { dialog } = useFileViewerDialog();

const viewWork = (student) => {
  dialog(student.work.files);
};
</script>
