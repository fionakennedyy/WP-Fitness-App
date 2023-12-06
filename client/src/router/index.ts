import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FeedView from '../views/FeedView.vue'
import ActivityView from '../views/ActivityView.vue'
import FindFriends from '../views/FindFriends.vue'
import UsersView from '../views/UsersView.vue'
import { getSession } from '@/model/session'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
      beforeEnter: requireLogin
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView,
      beforeEnter: requireLogin
    },
    {
      path: '/findfriends',
      name: 'findfriends',
      component: FindFriends,
      beforeEnter: requireLogin
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      beforeEnter: requireLogin
    }
  ]
});

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router
