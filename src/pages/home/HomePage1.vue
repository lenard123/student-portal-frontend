<template>
  <div>
    <HomepageHeader
      class="tw-shadow-lg tw-sticky tw-top-0 tw-h-16 tw-px-2 sm:tw-px-4 lg:tw-px-16 tw-backdrop-blur-sm tw-bg-opacity-90 tw-bg-white tw-z-20"
      @navigate="navigate"
    />
    <HomepageHome
      ref="home"
      class="section-height tw-px-2 sm:tw-px-4 lg:tw-px-16 tw-py-8 tw-h-auto sm:tw-h-[var(--height)]"
    />

    <HomepageAbout
      ref="about"
      class="tw-px-2 sm:tw-px-4 lg:tw-px-16 section-height tw-py-8"
    />

    <HomepageGallery
      ref="gallery"
      class="tw-px-2 sm:tw-px-4 lg:tw-px-16 section-height tw-py-8 tw-h-[var(--height)]"
    />

    <HomepageContact
      ref="contact"
      class="tw-px-2 sm:tw-px-4 lg:tw-px-16 section-height tw-py-8"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import HomepageAbout from "./components/HomepageAbout.vue";
import HomepageContact from "./components/HomepageContact.vue";
import HomepageGallery from "./components/HomepageGallery.vue";
import HomepageHeader from "./components/HomepageHeader.vue";
import HomepageHome from "./components/HomepageHome.vue";

const home = ref(null);
const about = ref(null);
const gallery = ref(null);
const contact = ref(null);

const navigate = (section) => {
  console.log(section);
  switch (section) {
    case "home":
      home.value.$el.scrollIntoView({ behavior: "smooth" });
      break;
    case "about":
      about.value.$el.scrollIntoView({ behavior: "smooth" });
      break;
    case "gallery":
      gallery.value.$el.scrollIntoView({ behavior: "smooth" });
      break;
    case "contact":
      contact.value.$el.scrollIntoView({ behavior: "smooth" });
      break;
  }
};
</script>

<style scoped>
.section-height {
  --height: calc(100dvh - 4rem);
  min-height: var(--height);
  scroll-margin-top: 4rem;
}
</style>
