<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div>
    <RouterView /> <!--shows the HomeView-->
  </div>
</template>

<style scoped>

  .container {
    background-color: #F4F3EE;
  }
</style>