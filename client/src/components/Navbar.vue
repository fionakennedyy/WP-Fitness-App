<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue'
import { getSession, useLogin } from '@/model/session'

const session = getSession()
const isActive = ref(false);

</script>
<template>
    <nav>
        <div class="navbar">
            <div class="navbar-brand"> <!--left side of nav, always visible-->
                <a class="navbar-item" href="https://vuejs.org/">
                    <img class="logo" src="@/assets/logo.svg" width="28" height="28" alt="Vue logo" >
                </a>
                <a role="button" class="navbar-burger" :class="{ 'is-active': isActive}" href=""></a>
            </div>
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/" >Home</RouterLink>
                <RouterLink class="navbar-item" to="/about">About</RouterLink>
                <RouterLink class="navbar-item" to="/activity">My Activity</RouterLink>
                <RouterLink class="navbar-item" to="/feed">Feed</RouterLink>
                <RouterLink class="navbar-item" to="/findfriends">Find Friends</RouterLink>
                <div class="navbar-item has-dropdown is-hoverable">
                    <RouterLink class="navbar-link" to="#">Admin</RouterLink>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="/users">Users</a>
                    </div>
                </div>
            </div>
            <div class="navbar-end"> <!--right part of navbar-->
                <div class="navbar-item">
                    <LoginBadge />
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    .navbar {
        background-color: #7189FF;
    }
</style>