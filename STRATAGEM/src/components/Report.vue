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

<!-- ────────── Styles ────────── -->
<style scoped>
/* ====== Layout-Wrapper ====== */
.report-container{max-width:1200px;margin:0 auto;padding:2rem}

/* ====== Filter-Bar ====== */
.filter-bar{
  display:flex; flex-wrap:wrap; gap:1.5rem;
  margin-bottom:2rem; padding:1.5rem;
  border:1px solid #e0e0e0; border-radius:8px;
  background:#f8f9fa; box-shadow:0 2px 4px rgba(0,0,0,0.05);
}

.filter-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f1f3f5;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: #495057;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-button:hover {
  background: #e9ecef;
  border-color: #ced4da;
}

.reset-icon {
  font-size: 1.1rem;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  min-height: 120px;
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74,144,226,0.25);
}

.filter-select option {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.filter-select option:hover {
  background-color: #f8f9fa;
}

/* ====== Kopfbereich & Überschriften ====== */
.header-section{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
h1{margin:0;font-size:1.5rem;font-weight:600;color:#2c3e50}
.round-title{margin:1.8rem 0 .6rem;font-size:1.25rem;font-weight:600;color:#2c3e50}

/* ====== Navigation unten ====== */
.bottom-navigation{display:flex;justify-content:center;margin:3rem 0;padding:2rem 0;border-top:1px solid #e0e0e0}
.enter-decisions-button{
  background:#2ecc71;color:#fff;padding:.75rem 1.6rem;
  border-radius:4px;transition:.15s background;
}
.enter-decisions-button:hover{background:#27ae60}

/* ====== Buttons allgemein (z.B. Scroll) ====== */
.scroll-button{
  background:#4a90e2;color:#fff;padding:.55rem 1rem;
  border-radius:4px;transition:.15s background;
}
.scroll-button:hover{background:#357abd}
</style>
