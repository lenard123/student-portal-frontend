<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Announcements</div>

    <q-card class="tw-mt-4">
      <q-card-section class="tw-flex tw-justify-between tw-items-center">
        <div>List of Announcements</div>
        <q-btn
          @click="addAnnouncement = true"
          label="Add Announcements"
          color="primary"
          unelevated
        />
      </q-card-section>
      <q-table
        :rows="store.announcements"
        row-key="id"
        :loading="store.fetchingAnnouncements"
      >
        <template v-slot:header>
          <q-tr>
            <q-th>Title</q-th>
            <q-th>Posted At</q-th>
            <q-th auto-width>Action</q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr>
            <q-td>{{ props.row.title }}</q-td>
            <q-td class="text-center">{{
              moment(props.row.created_at).fromNow()
            }}</q-td>
            <q-td>
              <div class="tw-flex">
                <q-btn
                  @click="editAnnouncement = props.row"
                  size="sm"
                  icon="edit"
                  flat
                />
                <q-btn
                  @click="deleteAnnouncement = props.row.id"
                  size="sm"
                  color="red"
                  icon="delete"
                  flat
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </app-page-container>
  <add-announcement-modal v-model="addAnnouncement" />
  <edit-announcement-modal v-model="editAnnouncement" />
  <app-confirm-dialog
    title="Confirm"
    message="Are you to delete?"
    v-model="deleteAnnouncement"
    :submitButton="{ label: 'Delete', color: 'red' }"
    @submit="handleDelete"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import AddAnnouncementModal from "./components/AddAnnouncementModal.vue";
import EditAnnouncementModal from "./components/EditAnnouncementModal.vue";
import { useAnnouncementStore } from "src/stores/announcements";
import moment from "moment";
import AppConfirmDialog from "src/components/AppConfirmDialog.vue";
import { Loading } from "quasar";
import { Notify } from "src/utils";

const addAnnouncement = ref(false);
const editAnnouncement = ref(false);
const deleteAnnouncement = ref(false);

const store = useAnnouncementStore();

const handleDelete = async () => {
  Loading.show();
  await store.deleteAnnouncement(deleteAnnouncement.value).finally(() => {
    Loading.hide();
  });
  deleteAnnouncement.value = false;
  Notify.success("Announcement deleted successfully");
};

onMounted(() => {
  store.fetchAnnouncements();
});
</script>
