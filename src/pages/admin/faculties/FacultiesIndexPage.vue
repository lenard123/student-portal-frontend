<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Faculties</div>

    <q-card class="tw-mt-4 tw-relative tw-h-full">
      <q-inner-loading :showing="store.loading" />
      <q-card-section class="tw-flex tw-justify-between tw-items-center">
        <div>List of faculties</div>
        <q-btn
          @click="addFaculty = true"
          label="Register faculty"
          color="primary"
          unelevated
        />
      </q-card-section>

      <q-list class="rounded-borders">
        <q-item
          v-for="faculty in store.faculties"
          :key="faculty.id"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="faculty.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ faculty.fullname }}</q-item-label>
            <q-item-label caption lines="2">
              {{ faculty.email }}
            </q-item-label>
          </q-item-section>

          <q-item-section side> 1 min ago </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
  <RegisterFacultyModal v-model="addFaculty" />
</template>

<script setup>
import { useFacultyStore } from "src/stores/faculty";
import { onMounted, ref } from "vue";
import RegisterFacultyModal from "./components/RegisterFacultyModal.vue";

const addFaculty = ref(false);

const store = useFacultyStore();

onMounted(() => {
  store.fetchFaculties();
});
</script>
