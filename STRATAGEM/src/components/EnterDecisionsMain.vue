<template>
  <div class="enter-container">
    <h1>
      Enter Decisions – {{ gameSession?.sessionName }} •
      Round {{ currentRound }}
    </h1>

    <CategoryInput
      v-for="(cat, idx) in categories"
      :key="idx"
      :name="cat.name"
      :subcategories="cat.subcategories"
      :teams="gameSession?.teams || []"
    />

    <div class="save-bar">
      <Button @click="handleSave">Save Decisions</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from 'vue'
import { useRoute, useRouter }            from 'vue-router'
import CategoryInput                      from './CategoryInput.vue'
import Button                             from './Button.vue'

/* ---------- basics ------------------------------------------------ */
const route   = useRoute()
const router  = useRouter()

const gameSession = ref(null)
const categories  = ref([])

const currentRound = computed(() =>
  gameSession.value?.history.at(-1).round || 1
)

/* ---------- helpers ----------------------------------------------- */
const deepClone = (o) => JSON.parse(JSON.stringify(toRaw(o)))
const bump      = (n) => Number((n * 1.1).toFixed(2))           //  +10 %

function calcNextRound (prev) {
  const clone = deepClone(prev)
  clone.forEach(c =>
    c.subcategories.forEach(s =>
      s.decisions.forEach(d =>
        d.values = d.values.map(bump)
      )
    )
  )
  return clone
}

/* ---------- load --------------------------------------------------- */
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
  categories.value  = deepClone(game.history.at(-1).categories)
})

/* ---------- save --------------------------------------------------- */
let saving = false         // schützt vor Doppelklick

function handleSave () {
  if (saving) return
  saving = true

  /* Strings → Zahlen (leere Felder bleiben leer) */
  categories.value.forEach(c =>
    c.subcategories.forEach(s =>
      s.decisions.forEach(d =>
        d.values = d.values.map(v => (v === '' ? '' : Number(v)))
      )
    )
  )

  /* Runde N aktualisieren */
  const hist      = gameSession.value.history
  hist[hist.length - 1].categories = deepClone(categories.value)

  /* neue Runde N+1 anlegen (Dummy-Berechnung) */
  hist.push({
    round      : hist.at(-1).round + 1,
    categories : calcNextRound(categories.value)
  })

  /* Storage updaten */
  const all  = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const idx  = all.findIndex(g => g.id === gameSession.value.id)
  if (idx !== -1) all[idx] = gameSession.value
  localStorage.setItem('savedGames', JSON.stringify(all))

  /* weiter zur Report-Seite */
  router.push(`/report/${gameSession.value.id}`)
}
</script>

<style scoped>
.enter-container { max-width:1200px; margin:0 auto; padding:2rem }
h1               { margin-bottom:2rem; font-size:1.5rem; font-weight:600 }
.save-bar        { text-align:center; margin:3rem 0 }
</style>
