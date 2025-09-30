<template>
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
            <option v-for="r in roundOptions" :key="r" :value="r">
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
            <option v-for="t in teamOptions" :key="t" :value="t">
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
            <option v-for="n in typeOptions" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </label>
      </div>
    </aside>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  gameSession: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:filters'])

/* ────────── state ────────── */
const roundOptions = ref([])
const teamOptions = ref([])
const typeOptions = ref([])
const selectedRounds = ref([])
const selectedTeams = ref([])
const selectedTypes = ref([])

/* ────────── methods ────────── */
const resetFilters = () => {
  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value = [...teamOptions.value]
  selectedTypes.value = [...typeOptions.value]
}

const initializeFilters = () => {
  if (!props.gameSession) return

  // Initialize options
  roundOptions.value = props.gameSession.history.map(h => h.round)
  teamOptions.value = props.gameSession.teams.map(t => t.abbreviation)
  typeOptions.value = props.gameSession.history[0].categories.map(c => c.name)

  // Set default selections
  selectedRounds.value = [...roundOptions.value]
  selectedTeams.value = [...teamOptions.value]
  selectedTypes.value = [...typeOptions.value]
}

/* ────────── watchers ────────── */
watch([selectedRounds, selectedTeams, selectedTypes], () => {
  emit('update:filters', {
    rounds: selectedRounds.value,
    teams: selectedTeams.value,
    types: selectedTypes.value
  })
}, { deep: true })

watch(() => props.gameSession, () => {
  initializeFilters()
}, { immediate: true })
</script>

<style scoped>
@import '../styles/Report.css';
</style>