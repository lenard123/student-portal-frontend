<template>
  <q-card class="tw-w-full">
    <q-card-section class="tw-flex tw-justify-between tw-items-start">
      <div class="tw-text-xl tw-font-bold">Assignments</div>
      <q-btn
        v-if="authStore.user.role == ROLE_FACULTY"
        unelevated
        color="primary"
        label="New Assignment"
        @click="newAssignment"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-list>
        <q-item v-for="assignment in store.assignments" :key="assignment.id">
          <q-item-section side top>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-medium">
              {{ assignment.title }}
            </q-item-label>
            <q-item-label caption v-if="assignment.deadline != null">
              Deadline: {{ moment(assignment.deadline).fromNow() }}
            </q-item-label>
            <q-item-label caption v-if="authStore.user.role == ROLE_STUDENT">
              Status:
              <span class="tw-capitalize">
                {{ store.getSubmittedAssignment(assignment.id).status }}
              </span>
            </q-item-label>
            <q-item-label
              v-if="
                authStore.user.role == ROLE_STUDENT &&
                store.getSubmittedAssignment(assignment.id).status == 'graded'
              "
              caption
            >
              Grade:
              <span class="tw-capitalize">
                {{ store.getSubmittedAssignment(assignment.id).grade }}/100
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn
              :to="{
                name: 'portal:subjects/assignments/view',
                params: { assignment_id: assignment.id },
              }"
              flat
              label="View"
              color="primary"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import useDialog from "src/composables/useDialog";
import { ROLE_FACULTY, ROLE_STUDENT, useAuthStore } from "src/stores/auth";
import CreateAssignment from "./components/CreateAssignment.vue";
import { onMounted } from "vue";
import { useSchedule } from "src/stores/schedule";
import { useRoute } from "vue-router";
import moment from "moment";

const authStore = useAuthStore();
const route = useRoute();
const store = useSchedule(route.params.id);
const { dialog } = useDialog();
const newAssignment = () => {
  dialog({
    component: CreateAssignment,
  });
};

onMounted(() => {
  store.fetchAssignments();
  if (authStore.user.role == ROLE_STUDENT) store.fetchSubmittedAssignments();
});
</script>
