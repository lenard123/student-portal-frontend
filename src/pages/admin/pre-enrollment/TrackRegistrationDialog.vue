<template>
  <q-card-section>
    <q-input label="Transaction ID" filled v-model="transaction_id" />
  </q-card-section>
</template>

<script setup>
import { Loading } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const transaction_id = ref("");
const router = useRouter();
defineExpose({
  title: "Track Registration",
  async onSubmit() {
    Loading.show();
    try {
      const { data } = await api.get(
        `/enrollment/transaction_id/${transaction_id.value}`
      );
      router.push({
        name: "admin:pre-enrollment/info",
        params: { id: data.id },
      });
    } finally {
      Loading.hide();
    }
  },
});
</script>
