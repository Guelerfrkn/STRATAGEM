import { createRouter, createWebHistory } from 'vue-router'

/* Seiten-Components ------------------------------------------------ */
import Home from './components/Home.vue'
import CreateTeams from './createTeams.vue'
import About from './components/About.vue'
import Impressum from './components/legalNotice.vue'
import Report from './components/Report.vue'
import EnterDecisionsMain from './components/EnterDecisionsMain.vue'

/* ------------------------------------------------------------------ */
const routes = [
  { path: '/', component: Home },
  { path: '/createTeams', component: CreateTeams },
  { path: '/about', component: About },
  { path: '/impressum', component: Impressum },

  /* *** EINHEITLICH:   id   **************************************** */
  { path: '/report/:id', component: Report, props: true },
  { path: '/enter-decisions/:id', component: EnterDecisionsMain, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
