<template>
  <q-card>
    <q-card-section class="tw-px-2">
      <div class="tw-flex tw-flex-col tw-items-center tw-py-8">
        <label>
          <q-avatar size="8rem">
            <img :src="user.avatar" />
            <input
              accept="image/*"
              @change="updateAvatar"
              type="file"
              class="tw-hidden"
            />
          </q-avatar>
        </label>
        <div class="tw-uppercase tw-mt-4 tw-font-bold tw-text-lg">
          {{ user.fullname }}
        </div>
        <div class="tw-text-slate-500">{{ user.email }}</div>
      </div>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Department</q-item-label>
            <q-item-label caption>{{ capitalizedDepartment }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section v-if="user.role == 'student'">
            <q-item-label>Student Number</q-item-label>
            <q-item-label caption>{{ user.info.student_id }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section v-if="user.role == 'student'">
            <q-item-label>Status</q-item-label>
            <q-item-label caption>{{ capitalizedStatus }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { Loading } from "quasar";
import { api } from "src/boot/axios";
import { Notify } from "src/utils";

export default {
  inject: ["user", "refreshUser"],
  computed: {
    capitalizedDepartment() {
      const department = this.user.department;
      return department.charAt(0).toUpperCase() + department.slice(1);
    },

    capitalizedStatus() {
      const status = this.user.current_registration.status;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
  },
  methods: {
    updateAvatar(e) {
      const [file] = e.target.files;
      if (file) {
        const formdata = new FormData();
        formdata.append("avatar", file);
        formdata.append("_method", "PATCH");
        Loading.show();
        api
          .post(`/user/avatar`, formdata)
          .then(() => {
            this.refreshUser();
            Notify.success("Avatar updated successfully");
          })
          .finally(() => {
            Loading.hide();
          });
      }
    },
  },
};
</script>
