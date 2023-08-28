<template>
  <div class="tw-flex-grow">
    <q-card>
      <q-card-section>
        <div class="tw-text-2xl tw-font-bold">Students List</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list>
          <q-item v-for="student in students" :key="student.id">
            <q-item-section avatar>
              <q-avatar>
                <img :src="student.avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ student.fullname }}</q-item-label>
              <q-item-label caption>{{ student.email }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-if="student.id != user.id"
                :to="{
                  name: 'portal:messages',
                  query: { user_id: student.id },
                }"
                flat
                dense
                round
                icon="message"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";

const schedule = inject("schedule");
const user = inject("user");
const students = computed(() => schedule.value.section.students);
console.log({ schedule });
</script>
