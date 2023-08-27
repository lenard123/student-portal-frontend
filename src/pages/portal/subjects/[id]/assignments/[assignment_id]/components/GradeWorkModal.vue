<template>
  <q-card-section>
    <q-input readonly outlined label="Student" :modelValue="student.fullname" />
    <q-input
      type="number"
      label="Grade"
      v-model="grade"
      filled
      class="tw-mt-4"
    />
  </q-card-section>
</template>

<script setup>
import { useAssignment } from "src/stores/assignment";
import { ref } from "vue";

const props = defineProps(["student", "assignment_id"]);
const grade = ref();

const store = useAssignment(props.assignment_id);

defineExpose({
  title: "Grade Assignment",
  async onSubmit() {
    await store.gradeWork({
      grade: grade.value,
      student_id: props.student.id,
    });
  },
});
</script>
