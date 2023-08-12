<template>
  <q-card v-if="user.role == ROLE_FACULTY">
    <q-card-section class="tw-flex tw-gap-4 tw-items-start">
      <q-avatar>
        <img :src="user.avatar" />
      </q-avatar>
      <div class="tw-flex-grow tw-flex tw-flex-col tw-gap-2">
        <q-input
          class="tw-flex-grow"
          autogrow
          outlined
          v-model="description"
          label="Announce something to your class"
        />
        <q-btn
          @click="handleSubmit"
          class="tw-self-end"
          unelevated
          color="primary"
          label="Post"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { Loading, LoadingBar } from "quasar";
import { ROLE_FACULTY, useAuthStore } from "src/stores/auth";
import { useSchedule } from "src/stores/schedule";
import { Notify } from "src/utils";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const description = ref("");
const store = useSchedule(route.params.id);

const handleSubmit = async () => {
  try {
    Loading.show();
    await store.createPost(description.value);
    Notify.success("Posted successfully");
    description.value = "";
  } finally {
    Loading.hide();
  }
};
</script>
