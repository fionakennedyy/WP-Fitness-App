<script setup lang="ts">

</script>

<template>
  <div class="hero-body">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <h1 class="title">Sign Up</h1>
        <div class="field">
          <label for="fname">First Name</label>
          <p id="fname" class="control has-icons-left">
            <input class="input" type="text" placeholder="First Name" />
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label for="lname">Last name</label>
          <p class="control has-icons-left">
            <input id="lname" class="input" type="text" placeholder="Last Name" />
            <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <p id="email" class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i> 
            </span>
          </p>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <p class="control has-icons-left">
            <input id="password" class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <hr>
        <div class="field">
          <label for="birthdate">Birthdate</label>
          <p class="control has-icons-right">
            <input id="birthdate" class="input" type="select" placeholder="Format: MM/DD/YYYY" />
          </p>
        </div>
        <div class="field">
          <label for="gender">Gender</label>
          <p class="control has-icons-left has-icons-right">
            <div class="select is-fullwidth">
            <select id="gender" class="input" type="select">
              <option value="select"> </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          </p>
        </div>
        <hr>
        <div class="field">
          <p class="control">
            <button class="button is-success" type="submit">Submit</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>