<template>
  <q-card-section>
    {{ message }}
  </q-card-section>
</template>

<script setup>
const props = defineProps(["message", "onSubmit"]);

defineExpose({
  title: "Confirm",
  onSubmit: props.onSubmit,
});
</script>
