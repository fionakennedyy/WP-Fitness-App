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

</script>

<template>
  <div>
    <h1>Users Page</h1>
    <h1 class="title">User List</h1>
    <progress v-if="isLoading" class="progress is-success">Loading...</progress>

    <table class="table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>
</template>

<style scoped></style>
