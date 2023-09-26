<template>
  <div>
    <div class="tw-container tw-mx-auto tw-flex tw-flex-col tw-h-full">
      <h6 class="tw-text-center tw-text-primary tw-font-medium">GALLERY</h6>
      <div class="q-pa-md tw-h-full">
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          class="tw-h-full"
        >
          <q-carousel-slide
            :name="1"
            img-src="/1.jpg"
            class="tw-h-full tw-rounded-2xl"
          />
          <q-carousel-slide
            :name="2"
            img-src="/2.jpg"
            class="tw-h-full tw-rounded-2xl"
          />
          <q-carousel-slide
            :name="3"
            img-src="/3.jpg"
            class="tw-h-full tw-rounded-2xl"
          />
        </q-carousel>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const slide = ref(1);
</script>
