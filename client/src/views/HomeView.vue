<script setup lang="ts">
import { ref } from "vue";
const newTask = ref("");
const tasks = ref([] as { id?: number, text: string, completed: boolean }[]); //task class, id optional bc of '?'

const tabList = ['Current', 'Completed', 'All'];
const tabState = ref('Current');

function addTask() {
  tasks.value.push({ text: newTask.value, completed: false });
  newTask.value = ""; //empties task input bar
};

function shouldDisplay(task: { id?: number, text: string, completed: boolean}) {
  return (tabState.value == 'Current' && !task.completed) ||
    (tabState.value == 'Completed' && task.completed) ||
    tabState.value == 'All';
  }
</script>

<template>
  <main class="columns">
    <div class="column is-full">
      <h1 class="title ml-3">Welcome!</h1>
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">To Do</p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="What do you want to do?"
              @keypress.enter="addTask"
              v-model="newTask"
            />
            <!--v-model -->
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs">
          <!--listening for click event, .prevent modifier means do not send to the browser-->
          <a v-for="tab in tabList" :class="{'is-active': tabState == tab}" @click.prevent="tabState = tab">{{ tab }}</a>
          <a>Completed</a>
          <a>All</a>
        </p>

        <label class="panel-block" v-for="task in tasks" v-show="shouldDisplay(task)">
          <input type="checkbox" v-model="task.completed">
          {{ task.text }}
          <!--outputs task-->
        </label>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
