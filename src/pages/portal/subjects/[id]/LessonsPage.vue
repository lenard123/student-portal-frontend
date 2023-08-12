<template>
  <q-card class="tw-w-full">
    <q-card-section class="tw-flex tw-justify-between tw-items-start">
      <div class="tw-text-xl tw-font-bold">Lessons</div>
      <q-btn
        v-if="authStore.user.role == ROLE_FACULTY"
        unelevated
        color="primary"
        label="New Lesson"
        @click="newLesson"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-list>
        <q-item v-for="lesson in lessons" :key="lesson.id">
          <q-item-section side top>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ lesson.title }}
            </q-item-label>
            <q-item-label caption>
              {{ lesson.description }}
            </q-item-label>
            <q-item-label class="tw-flex tw-justify-start">
              {{ moment(lesson.created_at).fromNow() }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn flat label="View" color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import useDialog from "src/composables/useDialog";
import CreateLessonDialog from "./components/CreateLessonDialog.vue";
import { useSchedule } from "src/stores/schedule";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import moment from "moment";
import { ROLE_FACULTY, useAuthStore } from "src/stores/auth";

const { dialog } = useDialog();
const route = useRoute();
const store = useSchedule(route.params.id);
const lessons = computed(() => store.lessons);
const authStore = useAuthStore();

const newLesson = () => {
  dialog({
    component: CreateLessonDialog,
  });
};

onMounted(() => {
  store.fetchLessons();
});
</script>
