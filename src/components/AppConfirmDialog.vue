<template>
  <app-dialog
    :model-value="!!modelValue"
    :title="title"
    :submitButton="submitButton"
    @cancel="$emit('update:modelValue', false)"
    :cancelButton="{ label: 'Cancel' }"
  >
    {{ message }}
  </app-dialog>
</template>

<script setup>
import AppDialog from "./AppDialog.vue";
defineProps(["modelValue", "title", "message", "submitButton"]);
defineEmits(["update:modelValue"]);
</script>
