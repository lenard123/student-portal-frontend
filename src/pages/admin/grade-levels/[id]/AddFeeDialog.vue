<template>
  <q-dialog persistent ref="dialogRef">
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-text-xl tw-font-bold">Add Fee</q-card-section>
        <q-separator />
        <q-card-section class="tw-flex tw-flex-col tw-gap-4">
          <q-input v-model="data.fee" filled label="Fee" />
          <q-input v-model="data.amount" filled label="Amount" type="number" />
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
import { Notify } from "src/utils";
import { reactive } from "vue";

const props = defineProps(["gradeLevelId"]);
const store = useGradeLevel(props.gradeLevelId);
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const data = reactive({
  amount: 0,
  fee: "",
});

const handleSubmit = async () => {
  Loading.show();
  try {
    await store.addFee(data);
    onDialogHide();
    Notify.success("Fee added successfully");
  } finally {
    Loading.hide();
  }
};
</script>
