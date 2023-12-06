<script setup lang="ts">
import { getSession, useLogin } from '@/model/session'

const session = getSession()
const { login, logout } = useLogin()

const doLogin = (id: number) => {
  if (id == 1) {
    login('kennedyf2@newpaltz.edu', 'fkpassword')
  }
  else if (id == 2) {
    login('marcelineabadeer@a.com', 'mapassword')
  }
  else if (id == 3) {
    login('jasonvorhees@a.com', 'jvpassword')
  }
}

const doLogout = () => {
  logout();
}

</script>

<template>
  <div class="media has-text-right" v-if="session.user">
    <figure class="media-left" style="height: 48;">
      <p class="image is-48x48">
        <img :src="session.user.image" alt="User Image" class="is-rounded">
      </p>
    </figure>
    <div class="media-content">
      Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
      <small>
        {{ session.user.email }}
        <a class="button is-small is-success" @click.prevent="doLogout">
          <span class="icon">
            <i class="fas fa-sign-out-alt"></i>
          </span>
        </a>
      </small>
    </div>
  </div>
  <div class="buttons" v-else>
    <RouterLink class="button is-primary" to="/register">Register</RouterLink>
    <!--<a class="button is-light" @click.prevent="doLogin">
      Log in
    </a>-->
    <div class="dropdown is-hoverable is-right">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
          <span>Log In</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a href="#" class="dropdown-item" @click.prevent="doLogin(1)">
            Fiona Kennedy
          </a>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item" @click.prevent="doLogin(2)">
            Marceline Abadeer
          </a>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item" @click.prevent="doLogin(3)">
            Jason Voorhees
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-item img {
  max-height: fit-content;
}
</style>