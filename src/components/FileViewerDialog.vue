<template>
  <q-list>
    <AppFileItem v-for="file in files" :key="file.id" :file="file" />
  </q-list>
</template>
<script setup>
import AppFileItem from "./AppFileItem.vue";

defineProps(["files"]);

defineExpose({
  title: "Files",
});
</script>
