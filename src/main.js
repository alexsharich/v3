import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import AppHome from './pages/home/AppHome.vue'
import AppFavorites from './pages/favorites/AppFavorites.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: AppHome },
  { path: '/favorites', name: 'Favorites', component: AppFavorites }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)
app.use(autoAnimatePlugin)
app.use()
app.mount('#app')
