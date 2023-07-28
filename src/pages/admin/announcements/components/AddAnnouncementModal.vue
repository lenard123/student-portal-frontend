<template>
  <app-dialog
    :model-value="modelValue"
    title="Add Announcements"
    :cancelButton="{ label: 'Cancel' }"
    :submitButton="{ label: 'Submit' }"
    @cancel="closeDialog"
    @submit="handleSubmit"
  >
    <q-input v-model="data.title" label="Title" filled />
    <q-input
      v-model="data.content"
      class="tw-mt-4"
      label="Content"
      filled
      autogrow
    />
  </app-dialog>
</template>

<script setup>
import { Loading } from "quasar";
import AppDialog from "src/components/AppDialog.vue";
import { useAnnouncementStore } from "src/stores/announcements";
import { Notify } from "src/utils";
import { reactive } from "vue";

const store = useAnnouncementStore();
const emits = defineEmits(["update:modelValue"]);
defineProps(["modelValue"]);

const data = reactive({
  title: "",
  content: "",
});

const closeDialog = () => {
  emits("update:modelValue", false);
  data.title = "";
  data.content = "";
};

const handleSubmit = async () => {
  Loading.show();
  await store.createAnnouncements(data).finally(() => {
    Loading.hide();
  });
  Notify.success("Announcement posted successfully");
  closeDialog();
};
</script>
