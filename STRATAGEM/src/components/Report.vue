<template>
  <div class="report-container">
    <!-- ───────── Filter-Bereich (oben) ───────── -->
    <section class="filter-bar-horizontal">
      <div class="filter-header">
        <h3>Filter Options</h3>
        <button class="reset-button" @click="resetFilters" title="Reset all filters to default">
          <span class="reset-icon">↺</span> Reset
        </button>
      </div>

      <div class="filter-content">
        <!-- Runden -->
        <div class="filter-group">
          <label>
            Rounds
            <select multiple v-model="selectedRounds" class="filter-select">
              <option v-for="r in roundOptions" :key="r" :value="r">{{ r }}</option>
            </select>
          </label>
        </div>

        <!-- Teams -->
        <div class="filter-group">
          <label>
            Teams
            <select multiple v-model="selectedTeams" class="filter-select">
              <option v-for="t in teamOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
        </div>

        <!-- Typen -->
        <div class="filter-group">
          <label>
            Types
            <select multiple v-model="selectedTypes" class="filter-select">
              <option v-for="n in typeOptions" :key="n" :value="n">{{ n }}</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <!-- ───────── Report-Ausgabe ───────── -->
    <main>
      <div class="header-section">
        <h1>
          Stratagem Report – {{ gameSession?.sessionName }}
          • Last Round {{ lastRound }}
        </h1>

        <Button class="scroll-button" @click="scrollToBottom">
          Scroll to Bottom
        </Button>
      </div>

      <section v-for="r in filteredByRound" :key="r.round" class="round-block">
        <h2 class="round-title">Round {{ r.round }}</h2>
        <ReportCategory
            v-for="(cat, i) in r.categories"
            :key="i"
            :name="cat.name"
            :subcategories="cat.subcategories"
            :teams="displayTeams"
        />
      </section>

      <div v-if="lastRound < MAX_ROUND" class="bottom-navigation">
        <Button class="enter-decisions-button" @click="toEnter">
          Enter Decisions
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReportCategory from './ReportCategory.vue'
import Button from './Button.vue'

const MAX_ROUND = 10
const route = useRoute()
const router = useRouter()
const gameSession = ref(null)

const roundOptions = ref([])
const teamOptions = ref([])
const typeOptions = ref([])

const selectedRounds = ref([])
const selectedTeams = ref([])
const selectedTypes = ref([])

const lastRound = computed(() =>
    gameSession.value?.history.at(-1).round || 1
)

const displayTeams = computed(() =>
    selectedTeams.value.map(abbr =>
        gameSession.value.teams.find(t => t.abbreviation === abbr)
    )
)

const filteredByRound = computed(() => {
  if (!gameSession.value) return []

  const teamIdx = selectedTeams.value.map(a =>
      gameSession.value.teams.findIndex(t => t.abbreviation === a)
  )

  return gameSession.value.history
      .filter(h => selectedRounds.value.includes(h.round))
      .map(h => ({
        round: h.round,
        categories: h.categories
            .filter(c => selectedTypes.value.includes(c.name))
            .map(c => ({
              ...c,
              subcategories: c.subcategories.map(sub => ({
                ...sub,
                decisions: sub.decisions.map(dec => ({
                  ...dec,
                  values: teamIdx.map(i => dec.values[i])
                }))
              }))
            }))
      }))
})

const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

const toEnter = () =>
    router.push(`/enter-decisions/${gameSession.value.id}`)

const resetFilters = () => {
  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value = [...teamOptions.value]
  selectedTypes.value = [...typeOptions.value]
}

onMounted(() => {
  const id = route.params.id
  const list = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const game = list.find(g => g.id === id)

  if (!game) {
    alert('Game not found – returning home')
    router.push('/')
    return
  }

  gameSession.value = game
  roundOptions.value = game.history.map(h => h.round)
  teamOptions.value = game.teams.map(t => t.abbreviation)
  typeOptions.value = game.history[0].categories.map(c => c.name)

  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value = [...teamOptions.value]
  selectedTypes.value = [...typeOptions.value]
})
</script>

<style scoped>
@import '../styles/Report.css';

.report-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-md);
}

.filter-bar-horizontal {
  width: 100%;
  background-color: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  padding: var(--space-md);
  margin-bottom: var(--space-xl);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-200);
  padding-bottom: var(--space-sm);
}

.filter-content {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  margin-top: var(--space-md);
}

.filter-group {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-weight: 500;
  color: var(--gray-700);
}

.filter-select {
  width: 100%;
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius-sm);
  min-height: 120px;
  transition: border-color var(--transition-fast);
}

.filter-select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.reset-button {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  transition: background-color var(--transition-fast);
}

.reset-button:hover {
  background-color: rgba(52, 152, 219, 0.1);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--gray-200);
}

h1 {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--dark);
}

.round-block {
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  transition: transform var(--transition-normal);
}

.round-block:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow-md);
}

.round-title {
  margin: 0 0 var(--space-lg) 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--dark);
  border-left: 4px solid var(--primary);
  padding-left: var(--space-md);
}

.bottom-navigation {
  position: sticky;
  bottom: var(--space-md);
  text-align: center;
  margin: var(--space-xxl) 0;
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
  z-index: 10;
}

.enter-decisions-button {
  background-color: var(--secondary);
  color: white;
  transition: background-color var(--transition-fast);
}

.enter-decisions-button:hover {
  background-color: var(--secondary-dark);
}

@media (max-width: 1024px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .round-block {
    padding: var(--space-md);
  }
}
</style>
