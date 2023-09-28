<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Student Information</div>
    <div class="tw-mt-8 tw-grid md:tw-grid-cols-4 tw-gap-4 tw-items-start">
      <q-card>
        <img
          :src="'https://via.placeholder.com/640x480.png/008822?text=doloribus'"
        />
        <q-card-section>
          <div class="tw-text-xl tw-font-bold">
            {{ student.fullname }}
          </div>
          <div class="tw-text-gray-600">{{ student.student_id }}</div>
        </q-card-section>
      </q-card>
      <div class="tw-col-span-3 tw-flex tw-flex-col tw-gap-4">
        <q-card>
          <q-card-section class="tw-text-xl tw-font-bold">
            Student Info
          </q-card-section>
          <q-separator />
          <q-card-section
            class="tw-grid tw-grid-cols-4 tw-gap-4 tw-text-gray-600"
          >
            <div>Gender:</div>
            <div class="tw-col-span-3">{{ student.info?.gender ?? "--" }}</div>

            <div>Birthday:</div>
            <div class="tw-col-span-3">
              {{ student.info?.birthday ?? "--" }}
            </div>

            <div>Birthplace:</div>
            <div class="tw-col-span-3">
              {{ student.info?.birthplace ?? "--" }}
            </div>

            <div>Civil Status:</div>
            <div class="tw-col-span-3">
              {{ student.info?.civil_status ?? "--" }}
            </div>

            <div>Religion:</div>
            <div class="tw-col-span-3">
              {{ student.info?.religion ?? "--" }}
            </div>

            <div>Nationality:</div>
            <div class="tw-col-span-3">
              {{ student.info?.nationality ?? "--" }}
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section class="tw-text-xl tw-font-bold">
            Sections
          </q-card-section>
          <q-table :columns="columns" :rows="student.enrolled_classes">
          </q-table>
        </q-card>
      </div>
    </div>
  </app-page-container>
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";

export default {
  setup() {
    return {
      student: ref({}),
      columns: [
        {
          label: "School Year",
          field: "academic_year",
          format: (val) => val.name,
        },
        {
          label: "Grade Level",
          field: "grade_level",
          format: (val) => val.name,
        },
        {
          label: "Section",
          field: "section",
          format: (val) => val.name,
        },
      ],
    };
  },

  async beforeMount() {
    const { data } = await api.get(`/students/${this.$route.params.id}`);
    this.student = data;
    console.log(data);
  },
};
</script>
