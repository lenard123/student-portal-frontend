<template>
  <app-dialog
    :model-value="typeof modelValue == 'object'"
    title="Update Announcements"
    :cancelButton="{ label: 'Cancel' }"
    :submitButton="{ label: 'Submit' }"
    @before-show="beforeShow"
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
const props = defineProps(["modelValue"]);

const data = reactive({
  id: null,
  title: "",
  content: "",
});

const closeDialog = () => {
  emits("update:modelValue", false);
  data.title = "";
  data.content = "";
};

const beforeShow = () => {
  data.id = props.modelValue.id;
  data.title = props.modelValue.title;
  data.content = props.modelValue.content;
};

const handleSubmit = async () => {
  Loading.show();
  await store.updateAnnouncements(data).finally(() => {
    Loading.hide();
  });
  Notify.success("Announcement updated successfully");
  closeDialog();
};
</script>
