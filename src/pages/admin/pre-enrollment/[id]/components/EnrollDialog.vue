<template>
  <q-card-section>
    <q-select
      :options="sections"
      option-label="name"
      filled
      label="Select Section"
      v-model="section"
    />
  </q-card-section>
</template>

<script setup>
import { useEnrollee } from "src/stores/enrollment";
import { Notify } from "src/utils";
import { computed, ref } from "vue";

const props = defineProps(["enrollee_id"]);

const section = ref(null);
const store = useEnrollee(props.enrollee_id);
const sections = computed(() => store.enrollee.grade_level.sections);

defineExpose({
  title: "Enroll Student",
  async onSubmit() {
    await store.enroll(section.value?.id);
    Notify.success("Student successfully enrolled");
  },
});
</script>
