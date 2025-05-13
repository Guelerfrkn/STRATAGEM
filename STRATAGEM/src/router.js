import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import CreateTeams from './CreateTeams.vue';
import About from './components/About.vue';
import Impressum from './components/legalNotice.vue';
import Report from './components/Report.vue';
import EnterDecisionsMain from './components/EnterDecisionsMain.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/createTeams', component: CreateTeams },
  { path: '/about', component: About },
  { path: '/impressum', component: Impressum },
  { 
    path: '/report/:gameId?', 
    component: () => import('./components/Report.vue'),
    props: true
  },
  {
    path: '/enter-decisions/:id',
    name: 'EnterDecisions',
    component: EnterDecisionsMain,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
