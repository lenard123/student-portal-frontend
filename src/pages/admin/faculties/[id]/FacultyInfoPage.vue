<template>
  <div class="tw-p-8" v-if="store.initialize">
    <div class="tw-text-4xl tw-font-bold">Faculty Information</div>
    <div class="tw-mt-8 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-start">
      <q-card>
        <img :src="store.faculty.avatar" />
        <q-card-section>
          <div class="tw-text-xl tw-font-bold">
            {{ store.faculty.fullname }}
          </div>
          <div class="tw-text-gray-600">{{ store.faculty.email }}</div>
        </q-card-section>
      </q-card>
      <q-table class="tw-col-span-2" />
    </div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel
    molestias molestiae! Eos error quia impedit non reprehenderit eaque,
    adipisci aliquid consequuntur similique assumenda dicta amet deleniti hic,
    ab rerum!
  </div>
</template>

<script setup>
import { useFaculty } from "src/stores/faculty";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useFaculty(route.params.id);

onMounted(() => {
  store.fetch();
});
</script>
