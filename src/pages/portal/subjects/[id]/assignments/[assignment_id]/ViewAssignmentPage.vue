<template>
  <div class="tw-flex-grow">
    <q-card>
      <q-card-section>
        <div class="tw-text-2xl tw-font-bold">
          {{ assignment.title }}
        </div>

        <div class="tw-text-gray-500" v-if="assignment.deadline != null">
          Deadline: <strong>{{ moment(assignment.deadline).fromNow() }}</strong>
        </div>
        <div class="tw-text-gray-500">
          Posted: <strong>{{ moment(assignment.created_at).fromNow() }}</strong>
        </div>
        <div class="tw-text-gray-500" v-if="user.role == ROLE_STUDENT">
          Status: <strong class="tw-capitalize">{{ yourWork.status }}</strong>
        </div>
        <div
          class="tw-text-gray-500"
          v-if="user.role == ROLE_STUDENT && yourWork.status == 'graded'"
        >
          Grade: <strong class="tw-capitalize">{{ yourWork.grade }}/100</strong>
        </div>
      </q-card-section>
      <q-tabs v-model="tab" align="left">
        <q-tab name="description" label="Description" />
        <q-tab name="files" label="Assignment Files" />
        <q-tab
          name="submitted"
          label="Submission"
          v-if="user.role == ROLE_FACULTY"
        />
        <q-tab name="graded" label="Graded" v-if="user.role == ROLE_FACULTY" />
        <q-tab name="work" label="Your Work" v-if="user.role == ROLE_STUDENT" />
      </q-tabs>
      <q-separator />
      <q-card-section v-if="tab == 'description'">
        {{ assignment.description }}
      </q-card-section>
      <q-list bordered separator v-else-if="tab == 'files'">
        <AppFileItem
          v-for="file in assignment.files"
          :key="file.id"
          :file="file"
        />
      </q-list>
      <q-card-section v-if="tab == 'work'">
        <q-list bordered separator>
          <AppFileItem
            v-for="file in yourWork.files"
            :key="file.id"
            :file="file"
          />
        </q-list>
        <div
          class="tw-mt-4 tw-justify-between tw-flex tw-gap-4 tw-w-full tw-items-center"
          v-if="yourWork.status == 'pending'"
        >
          <q-btn
            @click="fileInput.click()"
            label="Add File"
            icon="add"
            unelevated
          />
          <input
            ref="fileInput"
            @change="uploadFile"
            type="file"
            class="tw-hidden"
          />
          <q-btn
            @click="submitWork"
            label="Submit"
            icon="check"
            color="primary"
          />
        </div>
      </q-card-section>

      <GradedWork v-if="tab == 'graded'" :students="gradedStudents" />

      <q-card-section v-if="tab == 'submitted'">
        <q-list>
          <q-item-label header>Submitted</q-item-label>
          <template v-for="student in students" :key="student.id">
            <StudentItem
              v-if="getStatus(student) == 'submitted'"
              :student="student"
              :files="getWork(student)"
              status="submitted"
            />
          </template>
          <q-item-label header>Pending</q-item-label>
          <template v-for="student in students" :key="student.id">
            <StudentItem
              v-if="getStatus(student) == 'pending'"
              :student="student"
              :files="getWork(student)"
              status="pending"
            />
          </template>
          <!-- <q-item-label header>Graded</q-item-label>
          <template v-for="student in students" :key="student.id">
            <StudentItem
              v-if="getStatus(student) == 'graded'"
              :student="student"
              :files="getWork(student)"
              status="graded"
            />
          </template> -->
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import moment from "moment";
import { Loading, LoadingBar } from "quasar";
import AppFileItem from "src/components/AppFileItem.vue";
import { useConfirmDialog } from "src/composables/useDialog";
import { useAssignment } from "src/stores/assignment";
import { ROLE_FACULTY, ROLE_STUDENT } from "src/stores/auth";
import { Notify } from "src/utils";
import { computed, inject, provide, ref } from "vue";
import { useRoute } from "vue-router";
import GradedWork from "./components/GradedWork.vue";
import StudentItem from "./components/StudentItem.vue";

export default {
  async beforeRouteEnter(to, from, next) {
    const assignment_id = to.params.assignment_id;
    const store = useAssignment(assignment_id);
    if (store.assignment != null) return next();
    try {
      LoadingBar.start();
      await store.fetchAssignment();
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
const store = useAssignment(route.params.assignment_id);
const assignment = computed(() => store.assignment);
const tab = ref("description");
const user = inject("user");
const schedule = inject("schedule");
const students = computed(() => schedule.value.section.students);
const fileInput = ref(null);

provide("assignment", assignment);

const getAssignment = (student_id) => {
  return (
    assignment.value.submissions.find(
      (submission) => submission.student_id == student_id
    ) ?? {
      status: "pending",
      files: [],
    }
  );
};

const yourWork = computed(() => {
  return getAssignment(user.value.id);
});

const { dialog } = useConfirmDialog();

const getStatus = (student) => {
  return getAssignment(student.id).status;
};

const getWork = (student) => {
  return getAssignment(student.id).files;
};

const submitWork = () => {
  dialog({
    message: "Are you sure to submit this assignment?",
    async onSubmit() {
      await store.submitWork();
      Notify.success("Assignment submitted successfully");
    },
  });
};

const uploadFile = async (e) => {
  const [file] = e.target.files;
  if (file) {
    Loading.show();
    try {
      await store.attachFile(file);
      Notify.success("File uploaded successfully");
    } finally {
      Loading.hide();
    }
  }
};

const gradedStudents = computed(() => {
  return students.value
    .filter((student) => getStatus(student) == "graded")
    .map((student) => {
      return {
        ...student,
        work: getAssignment(student.id),
      };
    });
});
</script>
