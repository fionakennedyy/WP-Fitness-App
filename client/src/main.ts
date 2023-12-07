import './assets/main.css';
import "vue-toastification/dist/index.css";

import { createApp } from 'vue';
import Toast from "vue-toastification";
import App from './App.vue';
import router from './router';

// Create Vue application instance
const app = createApp(App);

// Use router + Toast plugin in application
app.use(router).use(Toast, {});

// Mount application to the element with the id 'app' in the HTML file
app.mount('#app');