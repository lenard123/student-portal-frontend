<template>
  <q-chat-message
    :text="[message.message]"
    :stamp="moment(message.created_at).fromNow()"
    :sent="sent"
  />
</template>

<script setup>
import moment from "moment";
import { useAuthStore } from "src/stores/auth";
import { computed } from "vue";

defineProps(["message", "sent"]);

const store = useAuthStore();
</script>
