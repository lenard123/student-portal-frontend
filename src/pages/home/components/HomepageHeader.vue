<template>
  <header>
    <div
      class="tw-container tw-h-full tw-mx-auto tw-flex tw-items-center tw-justify-between"
    >
      <div class="tw-flex tw-gap-4 tw-items-center">
        <q-avatar>
          <img src="/logo.png" />
        </q-avatar>
        <div class="tw-text-sm tw-font-bold sm:tw-flex tw-flex-col">
          <div class="tw-inline tw-mr-1">The Lord's Wisdom</div>
          <div class="tw-inline">Academy Of Caloocan</div>
        </div>
      </div>

      <div
        class="tw-hidden md:tw-flex tw-justify-center tw-absolute tw-inset-x-0 tw-top-0 tw-w-full"
      >
        <q-btn
          v-for="link in links"
          :key="link.label"
          :label="link.label"
          @click="$emit('navigate', link.to.name)"
          flat
          class="tw-h-16 lg:tw-px-8"
        />
      </div>

      <div>
        <q-btn
          class="tw-hidden md:tw-flex"
          outline
          label="Login"
          rounded
          color="primary"
          to="/login"
        />
        <q-btn class="md:tw-hidden" @click="sidebar = true" icon="menu" flat />
      </div>
    </div>
    <q-dialog v-model="sidebar" fullHeight position="right" maximized>
      <q-card class="tw-w-60">
        <q-list separator class="tw-mt-8">
          <q-item
            clickable
            v-for="link in links"
            :key="link.label"
            @click="navigateSidebar(link.to.name)"
          >
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>
        <q-card-section>
          <q-btn to="/login" class="tw-w-full" label="Login" color="primary" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </header>
</template>

<script setup>
import { nextTick, ref } from "vue";

const emits = defineEmits(["navigate"]);
const sidebar = ref(false);

const links = [
  { label: "Home", to: { name: "home" } },
  { label: "About", to: { name: "about" } },
  { label: "Gallery", to: { name: "gallery" } },
  { label: "Contact", to: { name: "contact" } },
];

const navigateSidebar = (name) => {
  sidebar.value = false;
  nextTick(() => {
    emits("navigate", name);
  });
};
</script>
