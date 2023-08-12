<template>
  <q-card>
    <q-card-section>
      <div class="tw-flex tw-gap-2 tw-items-center">
        <q-avatar>
          <img :src="author.avatar" />
        </q-avatar>
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-bold">{{ author.fullname }}</div>
          <div class="tw-text-sm tw-text-gray-500">
            {{ moment(post.created_at).fromNow() }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="tw-whitespace-pre-wrap">
      {{ post.description.trim() }}
    </q-card-section>
  </q-card>
</template>

<script setup>
import moment from "moment";

defineProps(["author", "post"]);
</script>
