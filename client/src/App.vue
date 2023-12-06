<script setup lang="ts">
import { RouterView } from "vue-router";
import { getSession } from './model/session';
import Navbar from "./components/Navbar.vue";

const session = getSession();
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="container">
    <progress class="progress is-small is-primary is-striped" max="100" v-if="session.loading">15%</progress>
    <RouterView />
  </div>
</template>

<style scoped>

</style>