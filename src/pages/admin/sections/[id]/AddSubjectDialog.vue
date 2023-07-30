<template>
  <q-dialog ref="dialogRef" persistent square>
    <q-card class="tw-w-full tw-max-w-screen-lg">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-text-xl tw-font-bold">
          Add Subject
        </q-card-section>
        <q-separator />
        <q-card-section class="tw-grid tw-grid-cols-2 tw-gap-2">
          <q-select
            :options="props.subjects"
            option-label="name"
            filled
            v-model="selectedSubject"
            label="Subject"
          />
          <q-select
            filled
            label="Teacher"
            v-model="selectedTeacher[selectedSubject?.id]"
            :options="teachers"
            option-label="fullname"
          />
          <div
            class="tw-grid tw-grid-cols-4 tw-gap-2 tw-col-span-2"
            v-for="schedule in schedules"
            :key="schedule.day"
          >
            <q-input label="Day" outlined readonly v-model="schedule.day" />
            <q-input
              type="time"
              class="tw-block tw-w-full"
              label="Start Time"
              outlined
              v-model="schedule.start"
            />
            <q-input
              type="time"
              class="tw-block tw-w-full"
              label="End Time"
              outlined
              v-model="schedule.end"
            />
            <q-input
              class="tw-block tw-w-full"
              label="Room"
              outlined
              v-model="schedule.room"
            />
          </div>
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
import { Loading, useDialogPluginComponent } from "quasar";
import { useSectionInfo } from "src/stores/sections";
import { Notify } from "src/utils";
import { computed, reactive, ref } from "vue";

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const props = defineProps(["subjects", "section_id"]);

const selectedSubject = ref(null);
const selectedTeacher = reactive({});
const store = useSectionInfo(props.section_id);
const teachers = computed(() => {
  if (selectedSubject.value == null) return [];
  return selectedSubject.value.faculties;
});

const schedules = ref([
  { day: "Monday", start: null, end: null, room: "" },
  { day: "Tuesday", start: null, end: null, room: "" },
  { day: "Wednesday", start: null, end: null, room: "" },
  { day: "Thursday", start: null, end: null, room: "" },
  { day: "Friday", start: null, end: null, room: "" },
  { day: "Saturday", start: null, end: null, room: "" },
  { day: "Sunday", start: null, end: null, room: "" },
]);

const handleSubmit = async () => {
  Loading.show();
  try {
    await store.addSubject({
      subject_id: selectedSubject.value?.id,
      faculty_id: selectedTeacher?.[selectedSubject.value?.id]?.id,
      schedules: schedules.value,
    });
    onDialogOK();
    Notify.success("Schedule Added successfully");
  } finally {
    Loading.hide();
  }
};
</script>
