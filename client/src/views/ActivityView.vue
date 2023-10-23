<!-- ActivityView.vue -->

<script lang="ts">
import { getSession } from "@/model/session";
const session = getSession();

export default {
  name: 'Activity',
  data() {
    return {
      formData: {
        title: "",
        type: "",
        duration: "",
        date: "",
        userID: "",
      },
      formDataArray: [] as Array<{
        id: number;
        title: string;
        type: string;
        duration: string;
        date: string;
        userID: number;
        userName: string;
      }>,
    };
  },
  computed: {
    concatenatedName() {
      return (session.user?.firstName || '') + ' ' + (session.user?.lastName || '');
    },
    filteredFormDataArray() {
      // filter formDataArray to only show entries with userID = session.user.id
      const filteredData = this.formDataArray.filter(entry => entry.userID === session.user?.id);
      console.log('Filtered Data:', filteredData);
      return filteredData;
    }
  },
  methods: {
    openModal() {
      // Set the userID to the current user's ID
      this.formData.userID = session.user?.id?.toString() || "";
      //document.getElementById("logWorkoutModal")?.setAttribute("class", "is-active");
      const logWorkoutModal = document.getElementById("logWorkoutModal");
      if (logWorkoutModal) {
        logWorkoutModal.style.display = 'flex';
      }
    },
    closeModal() {
      const logWorkoutModal = document.getElementById("logWorkoutModal");
      if (logWorkoutModal) {
        logWorkoutModal.style.display = 'none';
      }
    },
    submitForm() {
      // Handle form submission
      // Push form data to the array
      this.formDataArray.push({
        id: Date.now(), // Generate a unique ID
        title: this.formData.title,
        type: this.formData.type,
        duration: this.formData.duration,
        date: this.formData.date,
        userID: parseInt(this.formData.userID),
        userName: this.concatenatedName,
      });

      // Clear the form
      this.formData.title = "";
      this.formData.type = "";
      this.formData.duration = "";
      this.formData.date = "";
      this.formData.userID = "";

      // Store formDataArray in local storage
      localStorage.setItem('formDataArray', JSON.stringify(this.formDataArray));
    },
    deleteArticle(id: number) {
      const index = this.formDataArray.findIndex(entry => entry.id === id);
      if (index !== -1) {
        this.formDataArray.splice(index, 1); // Remove the article
        // Update local storage after deletion
        localStorage.setItem('formDataArray', JSON.stringify(this.formDataArray));
      }
    },
    /*getUserImage(userID: number) {
      const user = this.formDataArray.find((user) => user.userID === userID);
      return user ? user.image : 'https://bulma.io/images/placeholders/64x64.png';
    }*/
  },
  created() {
    // Retrieve formDataArray from local storage
    const storedData = localStorage.getItem('formDataArray');
    if (storedData) {
      this.formDataArray = JSON.parse(storedData);
      console.log('Stored Data:', this.formDataArray);
    }
  }
};
</script>

<template>
  <h1 class="title ml-3">Your Activity</h1>
  <div class="columns is-centered">
    <div class="column is-one-third">
      <div class="modal" id="logWorkoutModal">
        <div class="modal-background"></div>
        <div class="modal-card has-background-white">
          <header class="modal-card-head">
            <h3 class="modal-card-title">Log Workout:</h3>
            <button class="delete" aria-label="close" @click="closeModal"></button>
          </header>
          <section class="modal-card-body">

            <!--Log Workout Form-->
            <form @submit="submitForm">
              <div class="field">
                <label for="title" class="label">Title</label>
                <div class="control">
                  <input type="text" id="title" class="input" v-model="formData.title" required>
                </div>
              </div>
              <div class="field">
                <label for="type" class="label">Type</label>
                <div class="control">
                  <input type="text" id="type" class="input" v-model="formData.type" required>
                </div>
              </div>
              <div class="field">
                <label for="duration" class="label">Duration | Format: HH:MM</label>
                <div class="control">
                  <input type="text" id="duration" pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$" class="input"
                    v-model="formData.duration">
                </div>
              </div>
              <div class="field">
                <label for="date" class="label">Date</label>
                <div class="control">
                  <input type="date" id="date" class="input" v-model="formData.date" required>
                </div>
              </div>
              <!--<div class="field">
                <div class="control">
                  <input type="hidden" name="userID" id="userID" class="input" v-model="formData.userID" :value="session.user.id">
                </div>
              </div>-->
              <button class="button is-success" type="submit">Submit</button>
            </form>

          </section>
          <footer class="modal-card-foot">

            <button class="button" @click="closeModal">Cancel</button>
          </footer>
        </div>
      </div>

      <button id="logworkout" @click="openModal" class="button is-fullwidth is-success"><strong>Log
          Workout</strong></button>

      <h1 class="title has-text-danger" v-if="formDataArray.length === 0">No workouts posted</h1>
      <article class="media mt-5 p-2 is-full-width has-background-white" style="border-radius: 5px;"
        v-for="entry in filteredFormDataArray" :key="entry.id">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="User Image">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ entry.userName }}</strong> <small>{{ entry.date }}</small>
            </p>
            <div style="float:right">
              <p class="my-0">DURATION</p>
              <h1 class="title my-0">{{ entry.duration }}</h1>
            </div>
            <strong>{{ entry.title }}</strong>
            <p class="py-2">{{ entry.type }}</p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete" @click="deleteArticle(entry.id)"></button>
        </div>
      </article>

    </div>
  </div>
</template>

<style scoped></style>