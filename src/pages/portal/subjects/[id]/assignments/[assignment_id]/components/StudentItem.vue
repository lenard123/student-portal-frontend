<template>
  <q-expansion-item clickable>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar>
          <img :src="student.avatar" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ student.fullname }}</q-item-label>
        <q-item-label caption>{{ student.email }}</q-item-label>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        <q-list bordered separator>
          <AppFileItem v-for="file in files" :key="file.id" :file="file" />
        </q-list>
      </q-card-section>
      <q-card-section class="tw-flex tw-justify-end">
        <q-btn
          v-if="status == 'submitted'"
          label="Grade Work"
          color="primary"
          @click="gradeWork"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import AppFileItem from "src/components/AppFileItem.vue";
import useDialog from "src/composables/useDialog";
import { inject } from "vue";
import GradeWorkModal from "./GradeWorkModal.vue";

defineEmits(["gradeWork"]);
const props = defineProps(["student", "files", "status"]);
const assignment = inject("assignment");

const { dialog } = useDialog();
const gradeWork = () => {
  dialog({
    component: GradeWorkModal,
    componentProps: {
      student: props.student,
      files: props.files,
      assignment_id: assignment.value.id,
    },
  });
};
</script>
