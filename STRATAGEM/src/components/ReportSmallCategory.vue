<template>
  <div>
    <div style="display: flex; padding: 4px 8px; background-color: #f5f5f5; margin-bottom: 8px;">
      <span style="flex: 1;">{{ label }}</span>
      <div style="display: flex; gap: 20px;">
        <span v-for="(team, index) in teams" :key="index" style="min-width: 80px; text-align: right; font-weight: bold;">
          {{ team.abbreviation }}
        </span>
      </div>
    </div>
    <ul style="list-style: none; padding: 0;">
      <li v-for="(decision, index) in decisions" :key="index">
        <ReportDecision
          :label="decision.label" 
          :values="decision.values"
          :teams="teams"
          :isFirstDecision="false"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import ReportDecision from './ReportDecision.vue'

defineProps({
  label: String,
  decisions: Array,
  numTeams: Number,
  teams: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.small-category {
  margin-bottom: 2rem;
}

h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.decisions {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>  