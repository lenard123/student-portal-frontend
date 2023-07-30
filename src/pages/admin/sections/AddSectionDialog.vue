<template>
  <q-dialog persistent ref="dialogRef">
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-font-bold tw-text-xl"
          >Add new Section</q-card-section
        >
        <q-separator />
        <q-card-section class="tw-flex tw-flex-col tw-gap-4">
          <q-select
            v-model="gradeLevel"
            filled
            :options="gradeLevels"
            option-label="name"
            :loading="gradeLevelStore.loading"
            label="Grade Level"
          />
          <q-input filled v-model="name" label="Section" />
        </q-card-section>
        <q-card-section class="tw-flex tw-justify-end tw-gap-4">
          <q-btn label="Cancel" class="text-gray" flat @click="onDialogHide" />
          <q-btn type="submit" label="Submit" color="primary" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { Loading } from "quasar";
import { useDialogPluginComponent } from "quasar";
import { useGradeLevelsStore } from "src/stores/grade-levels";
import { useSections } from "src/stores/sections";
import { Notify } from "src/utils";
import { computed, onMounted, ref } from "vue";

const props = defineProps(["department", "academicYearId"]);
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const gradeLevelStore = useGradeLevelsStore();
const gradeLevels = computed(
  () => gradeLevelStore.departmentGradeLevels[props.department]
);
const gradeLevel = ref(null);
const name = ref(null);
const store = useSections(props.academicYearId);
const handleSubmit = async () => {
  Loading.show();
  try {
    await store.create({
      grade_level_id: gradeLevel.value?.id,
      name: name.value,
    });
    Notify.success("Section added successfully");
    onDialogHide();
  } finally {
    Loading.hide();
  }
};

onMounted(() => {
  gradeLevelStore.fetchAll();
});
</script>
