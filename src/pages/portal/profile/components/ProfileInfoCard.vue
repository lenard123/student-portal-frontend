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
            <q-item-label caption>Elementary</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Grade Level</q-item-label>
            <q-item-label caption>Grade 7</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Section</q-item-label>
            <q-item-label caption>Section A</q-item-label>
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
