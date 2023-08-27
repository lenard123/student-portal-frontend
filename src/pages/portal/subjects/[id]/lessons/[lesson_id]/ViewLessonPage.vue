<template>
  <div class="tw-flex-grow">
    <q-card>
      <q-card-section>
        <div class="tw-text-2xl tw-font-bold">
          {{ lesson.title }}
        </div>
        <div class="tw-text-gray-500">
          {{ moment(lesson.created_at).fromNow() }}
        </div>
      </q-card-section>
      <q-tabs v-model="tab" align="left">
        <q-tab name="description" label="Description" />
        <q-tab name="files" label="Files" />
      </q-tabs>
      <q-separator />
      <q-card-section v-if="tab == 'description'">
        {{ lesson.description }}
      </q-card-section>
      <q-list bordered separator v-else>
        <q-item v-for="file in lesson.files" :key="file.id">
          <q-item-section avatar>
            <q-icon :name="getIcon(file.meta.mimetype)" />
          </q-item-section>
          <q-item-section>{{ file.meta.filename }}</q-item-section>
          <q-item-section side>
            <q-icon name="download" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import moment from "moment";
import { LoadingBar } from "quasar";
import { useLesson } from "src/stores/lesson";
import { getIcon } from "src/utils";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  async beforeRouteEnter(to, from, next) {
    const lesson_id = to.params.lesson_id;
    const store = useLesson(lesson_id);
    if (store.lesson != null) return next();
    try {
      LoadingBar.start();
      await store.fetchLesson();
      next();
    } catch (err) {
      next(from);
    } finally {
      LoadingBar.stop();
    }
  },
};
</script>
<script setup>
const route = useRoute();
const store = useLesson(route.params.lesson_id);
const lesson = computed(() => store.lesson);
const tab = ref("description");
</script>
