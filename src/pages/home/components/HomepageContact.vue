<template>
  <div>
    <div
      class="tw-container tw-mx-auto tw-grid md:tw-grid-cols-2 tw-gap-16 tw-items-center"
    >
      <div>
        <h6 class="tw-text-primary tw-font-medium">CONTACT US</h6>
        <h3 class="tw-text-4xl tw-font-bold tw-mt-4">Send us a Message</h3>
        <q-form>
          <q-input v-model="data.name" label="Name" outlined class="tw-mt-8" />
          <q-input
            v-model="data.email"
            label="Email"
            outlined
            class="tw-mt-8"
            type="email"
          />
          <q-input
            v-model="data.message"
            type="textarea"
            label="Message"
            outlined
            class="tw-mt-8"
          />
          <q-btn
            type="submit"
            label="Send"
            color="primary"
            class="tw-mt-8 tw-px-8 tw-block tw-ml-auto"
          />
        </q-form>
      </div>

      <div>
        <div class="mapouter tw-rounded-2xl">
          <div class="gmap_canvas">
            <iframe
              class="gmap_iframe"
              width="100%"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=658&amp;height=400&amp;hl=en&amp;q=1162 Santol St., Corner Guyabano St., Brgy. 178, Area D, Camarin Caloocan City&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe
            ><a href="https://connectionsgame.org/">Connections NYT</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const data = reactive({
  name: "",
  email: "",
  message: "",
});
</script>
<style scoped>
.mapouter {
  position: relative;
  text-align: right;
  width: 100%;
  height: 400px;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  width: 100%;
  height: 400px;
}
.gmap_iframe {
  height: 400px !important;
}
</style>
