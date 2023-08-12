<template>
  <div class="tw-bg-slate-50 tw-flex">
    <aside class="tw-max-w-[300px] tw-h-screen tw-bg-white tw-pt-8 tw-flex-shrink-0 tw-w-full tw-shadow">
      <div class="tw-flex tw-flex-col tw-items-center tw-px-4">
        <q-avatar size="8rem">
          <img :src="user.avatar" />
        </q-avatar>
        <div class="tw-text-xl tw-mt-2">{{ user.fullname }}</div>
        <div class="tw-text-slate-500 tw-capitalize">{{ user.role }}</div>

        <q-btn class="tw-w-full tw-mt-3" label="View Profile" color="primary" />
      </div>
      <slot />
    </aside>
    <div class="tw-flex-grow tw-flex tw-flex-col">
      <header class="tw-bg-white tw-h-16 tw-shadow tw-flex tw-items-center tw-px-8">
        <router-link :to="{ name: 'student:home' }"
          class="tw-flex tw-gap-4 tw-items-center tw-no-underline tw-text-slate-600">
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          <div class="tw-text-base tw-font-bold">
            The Lord's Wisdom Academy<br />
            Of Caloocan
          </div>
        </router-link>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
defineProps(['user'])
</script>

