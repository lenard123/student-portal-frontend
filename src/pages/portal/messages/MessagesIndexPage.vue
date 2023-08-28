<template>
  <div class="tw-h-full tw-flex tw-items-center tw-justify-center">
    <h2>Select a message</h2>
  </div>
</template>
<script>
import { api } from "src/boot/axios";

export default {
  async beforeRouteEnter(to, from, next) {
    console.log({ to });
    if (to.query.user_id) {
      const { data: thread } = await api.get(
        `/users/${to.query.user_id}/thread`
      );
      console.log({ thread });
      next({
        name: "portal:messages/view",
        params: { role: to.params.role, thread_id: thread.id },
      });
    } else {
      next();
    }
  },
};
</script>
