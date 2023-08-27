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
    <q-input
      class="tw-mt-4"
      label="Deadline"
      filled
      v-model="deadline"
      mask="date"
      readonly
      clearable
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="deadline"
              :options="(date) => date >= moment().format('YYYY/MM/DD')"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
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
import moment from "moment";
import { useSchedule } from "src/stores/schedule";
import { Notify } from "src/utils";
import { ref } from "vue";
import { useRoute } from "vue-router";

const uploader = ref(null);
const route = useRoute();
const store = useSchedule(route.params.id);
const title = ref("");
const description = ref("");
const deadline = ref(null);

defineExpose({
  title: "Post new Assignment",
  dialogProps: {
    maximized: true,
  },
  async onSubmit() {
    // console.log(uploader.value);
    // return false;
    await store.createAssignments({
      title: title.value,
      description: description.value,
      deadline: deadline.value,
      files: uploader.value.files,
    });
    Notify.success("Lesson posted successfully");
  },
});
</script>
