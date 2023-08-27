<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :name="getIcon(file.meta.mimetype)" />
    </q-item-section>
    <q-item-section>{{ file.meta.filename }}</q-item-section>
    <q-item-section side>
      <q-icon name="download" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { getIcon } from "src/utils";

defineProps(["file"]);
</script>
