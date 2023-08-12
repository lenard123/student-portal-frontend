<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-gap-4">
    <CreatePost />

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :author="store.schedule.faculty"
      :post="post"
    />
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import CreatePost from "./components/CreatePost.vue";
import PostCard from "./components/PostCard.vue";
import { useSchedule } from "src/stores/schedule";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useSchedule(route.params.id);
const posts = computed(() => store.posts);

onMounted(() => {
  store.fetchPosts();
});
</script>
