<template>
  <div>
    <header
      class="tw-h-16 tw-sticky tw-top-0 tw-bg-white tw-z-20 tw-shadow-lg tw-px-8 tw-flex tw-items-center tw-justify-between"
    >
      <div class="tw-flex tw-gap-4 tw-items-center">
        <q-avatar>
          <img src="/logo.png" />
        </q-avatar>
        <div class="tw-text-base tw-font-bold">
          The Lord's Wisdom Academy<br />
          Of Caloocan
        </div>
      </div>
      <div>
        <q-btn :to="{ name: 'login' }" label="Login" flat />
        <q-btn
          @click="register"
          class="tw-ml-4"
          label="Register"
          color="orange"
        />
      </div>
    </header>
    <section class="background tw-px-8">
      <div class="tw-container tw-mx-auto tw-flex tw-items-center tw-h-full">
        <div class="tw-w-1/2 tw-text-white">
          <div class="tw-text-xl">
            Welcome to The Lord's Wisdom Academy Of Caloocan
          </div>
          <div class="tw-text-4xl tw-font-bold tw-mt-2">Student Portal</div>

          <p class="tw-mt-4 tw-text-justify">
            The purpose of Schools is to prepare students with promise to
            enhance their <br />
            intellectual, physical, social, emotional, spiritual, and artistic
            growth so that<br />
            they may realize their power for good as citizens
          </p>
          <q-btn
            @click="register"
            label="Register Now"
            color="orange"
            size="lg"
          />
        </div>
        <div class="tw-w-1/2 tw-flex justify-center">
          <img class="tw-w-1/2" src="./assets/undraw_online_test_re_kyfx.svg" />
        </div>
      </div>
    </section>
    <section class="tw-px-8 tw-flex tw-flex-col">
      <h3 class="text-center">About Us</h3>
      <div class="tw-container tw-mx-auto tw-grid tw-grid-cols-4 tw-gap-4">
        <q-card
          class="text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Mission</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <p>As a non-denominational learning institution run by the Lord's Wisdom Academy of Caloocan, Inc.  Board pf incorporators, we are:</p>
            <p>-Comitted to offer quality education based on the curricular set by the Department of Education and the academic, moral, and social standards set by the school </p>
            <p>-to provide pupils with an equitable access to quality education. Develop in them maturity and responsibility, foster in them relations with God to be just in their dealing with others.</p>
          </q-card-section>
        </q-card>

        <q-card
          class="text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Vision</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            Rooted by the belief of importance of quality education, the board of the The Lord's Wisdom Academy of Caloocan, Inc. envisions to have pupils who are literate, responsible, disciplined, God-fearing, environmental, friendly and globally competitive to the changing demand of time.
          </q-card-section>
        </q-card>

        <q-card
          class="text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Goals</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            At The Lord's Wisdom Academy of Caloocan INC, We take pride in providing a nurturing and inspiring environment that fosters academic excellence, personal growth, and character development. Our dedicated team of educators is committed to ensuring that each student receives the best possible education, tailored to their unique abilities and interests.
          </q-card-section>
        </q-card>

        <q-card
          class="text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Core Values</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            porro corrupti voluptate alias nesciunt adipisci ad explicabo,
            officiis, atque dicta similique delectus voluptatum impedit id, odio
            non! Iure, at alias?
          </q-card-section>
        </q-card>
      </div>
    </section>

    <section class="tw-px-8 tw-py-4">
      <div>
        <q-card class="tw-w-1/2 tw-mx-auto">
          <q-card-section>
            <div class="tw-text-2xl tw-font-bold">Contact Us</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="tw-flex tw-flex-col tw-gap-4">
            <q-input model-value="" label="Name" filled />
            <q-input model-value="" label="Email" filled />
            <q-input model-value="" label="Message" filled type="textarea" />
          </q-card-section>
          <q-card-section>
            <q-btn class="tw-ml-auto tw-block" label="Submit" color="primary" />
          </q-card-section>
        </q-card>
      </div>
    </section>

    <div class="tw-bg-gray-800 tw-h-6 tw-text-white tw-flex tw-items-center">
      <div class="tw-container tw-mx-auto tw-px-8">
        Copyright © 2023 All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import RegisterDialog from "../register/RegisterDialog.vue";

const $q = useQuasar();
const register = () => {
  $q.dialog({
    component: RegisterDialog,
  });
};
</script>

<style scoped>
.background {
  background-image: url("./assets/background.png");
}

section {
  height: calc(100vh - 4rem);
}
</style>
