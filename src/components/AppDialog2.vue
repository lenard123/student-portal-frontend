<template>
  <q-dialog ref="dialogRef" v-bind="instance?.dialogProps">
    <q-card class="tw-w-full">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-font-bold tw-text-xl">
          {{ instance?.title }}
        </q-card-section>
        <q-separator />
        <component
          :is="component"
          :ref="(e) => (instance = e)"
          v-bind="componentProps"
        />
        <q-card-section class="tw-flex tw-justify-end tw-gap-4">
          <q-btn
            label="Cancel"
            flat
            color="gray"
            v-bind="instance?.cancelProps"
            @click="handleCancel"
          />
          <q-btn
            label="Submit"
            color="primary"
            type="submit"
            v-bind="instance?.submitProps"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { ref } from "vue";

const props = defineProps(["component", "onSubmit", "componentProps"]);
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const instance = ref(null);

const handleCancel = () => {
  if (instance.value.onCancel) {
    const result = instance.value.onCancel();
    if (result !== false) onDialogCancel();
  } else {
    onDialogCancel();
  }
};

const handleSubmit = async () => {
  if (instance.value.onSubmit) {
    try {
      Loading.show();
      const result = await instance.value.onSubmit();
      if (result !== false) onDialogOK();
    } finally {
      Loading.hide();
    }
  }
};
</script>
