<script setup lang="ts">
import { ref } from "vue";
import { getUsers, type User } from "@/model/users";

const users = ref([] as User[]);
const isLoading = ref(false);

isLoading.value = true;
//1000 returns the products 1000 miliseconds later (1 sec)
setTimeout(() => {
  users.value = getUsers()
  isLoading.value = false;
}, 1000)

const editUser = (userId: number | undefined) => {
  if (userId !== undefined) {
    console.log("Editing user with ID:", userId);
    // Load the JSON data from users.json
  }
};

const deleteUser = (userId: number | undefined) => {
  if (userId !== undefined) {
    console.log("Deleting user with ID:", userId);
  }
};
</script>

<template>
  <div>
    <h1 class="title ml-3">User List</h1>
    <progress v-if="isLoading" class="progress is-success">Loading...</progress>

    <div class="columns is-centered">
      <div class="column is-one-third">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td><img :src="user.image" alt=""></td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button @click.prevent="editUser(user.id)">Edit</button>
                <button @click.prevent="deleteUser(user.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
