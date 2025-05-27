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
  label: String,
  decisions: Array,
  teams: Array
})

/* 1 Beschriftungs-Spalte + n Team-Spalten à 120 px */
const gridStyle = computed(
  () =>
    `display:grid;grid-template-columns:1fr repeat(${props.teams.length},120px);align-items:center;`
)
</script>

<style scoped>
.sub-head { background:#f3f3f3; font-weight:600; padding:6px 8px; margin:12px 0 4px }
.grid-row { border-bottom:1px solid #e0e0e0; padding:4px 0 }
.header   { font-weight:600 }          /* Zeile mit Kürzeln */

.label    { padding-left:4px }

/* Kürzel mittig in der Spalte */
.abbr     { text-align:center }

/* Eingabefeld linksbündig, feste Breite für saubere Spalten */
.val-input{
  width:100%; max-width:110px;
  text-align:left;          /* linksbündig */
  padding:2px 4px;
  border:1px solid #ccc;
  border-radius:3px
}
</style>

