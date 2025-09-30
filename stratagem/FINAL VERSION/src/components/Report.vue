<template>
  <div class="report-container">
    <!-- Filter Section -->
    <ReportFilter 
      :game-session="gameSession"
      @update:filters="updateFilters"
    />

    <!-- Report Output Section -->
    <main>
      <div class="header-section">
        <h1>
          Stratagem Report - {{ gameSession?.sessionName }}
          • Last Round {{ lastRound }}
        </h1>

        <Button class="scroll-button" @click="scrollToBottom">
          Scroll to Bottom
        </Button>
      </div>

      <div class="report-card">
        <section 
          v-for="round in filteredByRound" 
          :key="round.round" 
          class="round-block"
        >
          <h2 class="round-title my-2">
            {{ SECTION_HEADERS.ROUND }} {{ round.round }}
          </h2>

          <ReportCategory 
            v-for="(category, index) in round.categories" 
            :key="index" 
            :name="category.name" 
            :subcategories="category.subcategories"
            :teams="displayTeams" 
          />
        </section>
      </div>

      <!-- Navigation -->
      <div v-if="lastRound < MAX_ROUND" class="bottom-navigation">
        <Button class="enter-decisions-button" @click="toEnter">
          Enter Decisions
        </Button>
      </div>
    </main>
  </div>
</template>

<script setup>
/* ────────── imports ────────── */
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReportCategory from './ReportCategory.vue'
import ReportFilter from './ReportFilter.vue'
import Button from './Button.vue'
import { MAX_ROUND, SECTION_HEADERS } from '../constants/report'
import { loadGame } from '../utils/gameUtils'

/* ────────── composables ────────── */
const route = useRoute()
const router = useRouter()

/* ────────── state ────────── */
const gameSession = ref(null)
const selectedRounds = ref([])
const selectedTeams = ref([])
const selectedTypes = ref([])

/* ────────── computed properties ────────── */
const lastRound = computed(() => gameSession.value?.history.at(-1).round || 1)

const displayTeams = computed(() => 
  selectedTeams.value.map(abbr => 
    gameSession.value.teams.find(t => t.abbreviation === abbr)
  )
)

const filteredByRound = computed(() => {
  if (!gameSession.value) return []

  // Get indices of selected teams for efficient value filtering
  const teamIndices = selectedTeams.value
    .map(abbr => gameSession.value.teams.findIndex(t => t.abbreviation === abbr))

  return gameSession.value.history
    // Filter by selected rounds
    .filter(history => selectedRounds.value.includes(history.round))
    // Transform each round's data
    .map(history => ({
      round: history.round,
      categories: history.categories
        // Filter by selected category types
        .filter(category => selectedTypes.value.includes(category.name))
        // Transform category data
        .map(category => ({
          ...category,
          subcategories: category.subcategories.map(subcategory => ({
            ...subcategory,
            decisions: subcategory.decisions.map(decision => ({
              ...decision,
              // Filter values to only show selected teams
              values: teamIndices.map(index => decision.values[index])
            }))
          }))
        }))
    }))
})

/* ────────── methods ────────── */
const scrollToBottom = () => 
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

const toEnter = () => router.push(`/enter-decisions/${gameSession.value.id}`)

const updateFilters = (filters) => {
  selectedRounds.value = filters.rounds
  selectedTeams.value = filters.teams
  selectedTypes.value = filters.types
}

/* ────────── lifecycle hooks ────────── */
onMounted(() => {
  const id = route.params.id
  const game = loadGame(id)

  if (!game) {
    alert('Game not found – returning home')
    router.push('/')
    return
  }
  
  // Debug: Check first round data
  console.log('First round data:', game.history[0])
  console.log('Second round data:', game.history[1])
  
  gameSession.value = game
})
</script>

<style scoped>
@import '../styles/Report.css';

.report-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 24px;
  background: white;
  margin: 16px 0;
}

.round-title {
  margin: 8px 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
}

.my-2 {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
