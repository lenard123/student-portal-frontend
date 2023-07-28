<template>
  <q-dialog
    :model-value="modelValue"
    @before-show="$emit('before-show')"
    persistent
  >
    <q-card class="tw-w-full">
      <q-form @submit="$emit('submit')">
        <q-card-section>
          <div class="tw-text-2xl tw-font-bold">{{ title }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <slot />
        </q-card-section>
        <q-card-section class="tw-flex tw-justify-end tw-items-center tw-gap-4">
          <q-btn
            v-if="!!cancelButton"
            flat
            color="gray"
            v-bind="cancelButton"
            @click="$emit('cancel')"
          />
          <q-btn
            v-if="!!submitButton"
            unelevated
            color="primary"
            type="submit"
            v-bind="submitButton"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps(["modelValue", "title", "cancelButton", "submitButton"]);
defineEmits(["update:modelValue", "before-show", "cancel", "submit"]);
</script>
