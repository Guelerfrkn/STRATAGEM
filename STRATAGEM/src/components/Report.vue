<template>
  <div class="report-container">
    <!-- ───────── Filter-Bereich ───────── -->
    <aside class="filter-bar">
      <div class="filter-header">
        <h3>Filter Options</h3>
        <button class="reset-button" @click="resetFilters" title="Reset all filters to default">
          <span class="reset-icon">↺</span> Reset
        </button>
      </div>

      <!-- Runden -->
      <div class="filter-group">
        <label>
          Rounds
          <select multiple v-model="selectedRounds" class="filter-select">
            <option
              v-for="r in roundOptions"
              :key="r"
              :value="r"
            >
              {{ r }}
            </option>
          </select>
        </label>
      </div>

      <!-- Teams -->
      <div class="filter-group">
        <label>
          Teams
          <select multiple v-model="selectedTeams" class="filter-select">
            <option
              v-for="t in teamOptions"
              :key="t"
              :value="t"
            >
              {{ t }}
            </option>
          </select>
        </label>
      </div>

      <!-- Typen -->
      <div class="filter-group">
        <label>
          Types
          <select multiple v-model="selectedTypes" class="filter-select">
            <option
              v-for="n in typeOptions"
              :key="n"
              :value="n"
            >
              {{ n }}
            </option>
          </select>
        </label>
      </div>
    </aside>

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

      <!-- Für jede gefilterte Runde einen Block -->
      <section
        v-for="r in filteredByRound"
        :key="r.round"
        class="round-block"
      >
        <h2 class="round-title">Round {{ r.round }}</h2>

        <ReportCategory
          v-for="(cat, i) in r.categories"
          :key="i"
          :name="cat.name"
          :subcategories="cat.subcategories"
          :teams="displayTeams"
        />
      </section>

      <!-- bis Runde 10 Button anzeigen -->
      <div
        v-if="lastRound < MAX_ROUND"
        class="bottom-navigation"
      >
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
import { useRoute, useRouter }      from 'vue-router'
import ReportCategory               from './ReportCategory.vue'
import Button                       from './Button.vue'

/* ────────── Konstanten ────────── */
const MAX_ROUND = 10

/* ────────── Refs & Router ────────── */
const route        = useRoute()
const router       = useRouter()
const gameSession  = ref(null)

/* ────────── Optionen-Arrays ────────── */
const roundOptions = ref([])
const teamOptions  = ref([])
const typeOptions  = ref([])

/* ────────── Filter-Modelle ────────── */
const selectedRounds = ref([])
const selectedTeams  = ref([])
const selectedTypes  = ref([])

/* ────────── abgeleitete Daten ────────── */
const lastRound = computed(() =>
  gameSession.value?.history.at(-1).round || 1
)

/* Teams-Objekte in derselben Reihenfolge wie Auswahl */
const displayTeams = computed(() =>
  selectedTeams.value.map(abbr =>
    gameSession.value.teams.find(t => t.abbreviation === abbr)
  )
)

/* Runden-Filterung inkl. Typ- & Team-Zuschnitt */
const filteredByRound = computed(() => {
  if (!gameSession.value) return []

  const teamIdx     = selectedTeams.value
    .map(a => gameSession.value.teams.findIndex(t => t.abbreviation === a))

  return gameSession.value.history
    .filter(h => selectedRounds.value.includes(h.round))
    .map(h => ({
      round: h.round,
      categories: h.categories
        .filter(c => selectedTypes.value.includes(c.name))
        .map(c => ({
          ...c,
          /* Werte auf gewählte Teams reduzieren */
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

/* ────────── Funktionen ────────── */
const scrollToBottom = () =>
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior:'smooth' })

const toEnter = () => router.push(`/enter-decisions/${gameSession.value.id}`)

const resetFilters = () => {
  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value = [...teamOptions.value]
  selectedTypes.value = [...typeOptions.value]
}

/* ────────── onMounted ────────── */
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

  /* Optionen füllen */
  roundOptions.value = game.history.map(h => h.round)
  teamOptions.value  = game.teams.map(t => t.abbreviation)
  typeOptions.value  = game.history[0].categories.map(c => c.name)

  /* Standard-Auswahl = alles anzeigen */
  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value  = [...teamOptions.value]
  selectedTypes.value  = [...typeOptions.value]
})
</script>

<style scoped>
@import '../styles/Report.css';
</style>
