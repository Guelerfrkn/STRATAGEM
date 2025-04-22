import { createRouter, createWebHistory } from 'vue-router';
import CreateTeams from './createTeams.vue';
import About from './components/About.vue';
import Impressum from './components/legalNotice.vue'; 

const routes = [
  { path: '/', component: CreateTeams },
  { path: '/createTeams', component: CreateTeams },
  { path: '/about', component: About },
  { path: '/impressum', component: Impressum }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
