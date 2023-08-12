<template>
  <q-card-section>
    <q-input v-model="title" filled label="Title" />
    <q-input
      v-model="description"
      class="tw-mt-4"
      filled
      label="Description"
      type="textarea"
    />
    <q-uploader
      class="tw-mt-4 tw-w-full"
      hideUploadBtn
      noThumbnails
      label="Upload Files"
      multiple
      ref="uploader"
    />
  </q-card-section>
</template>

<script setup>
import { useSchedule } from "src/stores/schedule";
import { Notify } from "src/utils";
import { ref } from "vue";
import { useRoute } from "vue-router";

const uploader = ref(null);
const route = useRoute();
const store = useSchedule(route.params.id);
const title = ref("");
const description = ref("");

defineExpose({
  title: "Post new Lesson",
  dialogProps: {
    maximized: true,
  },
  async onSubmit() {
    // console.log(uploader.value);
    // return false;
    await store.createLesson({
      title: title.value,
      description: description.value,
      files: uploader.value.files,
    });
    Notify.success("Lesson posted successfully");
  },
});
</script>
