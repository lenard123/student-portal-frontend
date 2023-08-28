<template>
  <q-item :to="link" clickable v-if="messages_count > 0">
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        <img :src="avatar" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption lines="1">{{
        moment(updated_at).fromNow()
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import moment from "moment";
import { ROLE_ADMIN, useAuthStore } from "src/stores/auth";
import { computed } from "vue";

const props = defineProps([
  "id",
  "updated_at",
  "name",
  "avatar",
  "type",
  "members",
  "messages_count",
]);

const store = useAuthStore();

const link = computed(() => {
  if (store.user.role == ROLE_ADMIN)
    return {
      name: `admin:messages`,
      params: { thread_id: props.id },
    };

  return {
    name: `portal:messages/view`,
    params: { role: store.user.role, thread_id: props.id },
  };
});
</script>
