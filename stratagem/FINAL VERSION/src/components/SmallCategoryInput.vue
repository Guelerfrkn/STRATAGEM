<template>
  <!-- Unterkategorie-Titel -->
  <div class="sub-head">{{ label }}</div>

  <!-- Kopfzeile mit Kürzeln -->
  <div :style="gridStyle" class="grid-row header">
    <span></span>
    <span
      v-for="t in teams"
      :key="t.abbreviation"
      class="abbr"
    >
      {{ t.abbreviation }}
    </span>
  </div>

  <!-- Entscheidungen -->
  <div
    v-for="(dec, i) in decisions"
    :key="i"
    :style="gridStyle"
    class="grid-row"
  >
    <span class="label">{{ dec.label }}</span>

    <input
      v-for="(val, idx) in dec.values"
      :key="idx"
      v-model.number="dec.values[idx]"
      class="val-input"
      type="number"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  decisions: {
    type: Array,
    required: true
  },
  teams: {
    type: Array,
    required: true
  }
})

/* 1 Beschriftungs-Spalte + n Team-Spalten à 120 px */
const gridStyle = computed(() => 
  `display:grid;grid-template-columns:1fr repeat(${props.teams.length},120px);align-items:center;`
)
</script>

<style scoped>
@import '../styles/SmallCategoryInput.css';
</style>

