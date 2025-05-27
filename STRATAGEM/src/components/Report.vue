<template>
  <div class="report-container">
    <main>
      <div class="header-section">
        <h1>Stratagem Report – {{ gameSession?.sessionName }} • Round {{ round }}</h1>

        <Button class="scroll-button" @click="scrollToBottom">
          Scroll to Bottom
        </Button>
      </div>

      <ReportCategory
        v-for="(cat, i) in categories"
        :key="i"
        :name="cat.name"
        :subcategories="cat.subcategories"
        :teams="gameSession?.teams || []"
      />

      <div class="bottom-navigation">
        <Button class="enter-decisions-button" @click="toEnter">Enter Decisions</Button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter }      from 'vue-router'
import ReportCategory               from './ReportCategory.vue'
import Button                       from './Button.vue'

const route = useRoute()
const router = useRouter()

/* ------------------------------------------------------------------ */
const gameSession = ref(null)
const categories  = ref([])

const round = computed(() => gameSession.value?.history.at(-1).round || 1)

/* ------------------------------------------------------------------ */
const scrollToBottom = () =>
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

const toEnter = () => router.push(`/enter-decisions/${gameSession.value.id}`)

/* ------------------------------------------------------------------ */
onMounted(() => {
  const id   = route.params.id
  const list = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const game = list.find(g => g.id === id)

  if (!game) {
    alert('Game not found – returning home')
    router.push('/')
    return
  }
  gameSession.value = game
  categories.value  = structuredClone(game.history.at(-1).categories)
})
</script>

<style scoped>
.report-container { max-width:1200px; margin:0 auto; padding:2rem }
.header-section   { display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem }
h1                { margin:0; font-size:1.5rem; font-weight:600; color:#2c3e50 }
.bottom-navigation{ display:flex; justify-content:center; margin:3rem 0; padding:2rem 0; border-top:1px solid #e0e0e0 }
.enter-decisions-button{ background:#2ecc71; color:#fff; padding:.75rem 1.5rem; border-radius:4px }
.enter-decisions-button:hover{ background:#27ae60 }
</style>
