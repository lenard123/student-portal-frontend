<template>
  <q-table :columns="columns" :rows="gradeLevel.fees">
    <template v-slot:top-left>
      <div class="tw-font-bold tw-text-lg">List of Fees</div>
    </template>
    <template v-slot:top-right>
      <q-btn
        icon="add"
        unelevated
        label="Add Fee"
        color="primary"
        @click="addFee"
      />
    </template>
  </q-table>
</template>

<script setup>
import { useQuasar } from "quasar";
import AddFeeDialog from "./AddFeeDialog.vue";
const props = defineProps(["gradeLevel"]);
const columns = [
  { name: "name", label: "Fees", align: "left", field: "fee" },
  { name: "amount", label: "Amount", align: "left", field: "amount" },
  { name: "action", label: "Action" },
];
const $q = useQuasar();
const addFee = () => {
  $q.dialog({
    component: AddFeeDialog,
    componentProps: {
      gradeLevelId: props.gradeLevel.id,
    },
  });
};
</script>
