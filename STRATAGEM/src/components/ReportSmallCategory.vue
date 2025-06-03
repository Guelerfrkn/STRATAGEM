<template>
  <div>
    <div class="header">
      <span class="label">{{ label }}</span>
      <div class="teams">
        <span 
          v-for="(team, index) in teams" 
          :key="index" 
          class="team-abbr"
        >
          {{ team.abbreviation }}
        </span>
      </div>
    </div>
    <ul class="decisions-list">
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
@import '../styles/ReportSmallCategory.css';

.header {
  display: flex;
  padding: 4px 8px;
  background-color: #f5f5f5;
  margin-bottom: 8px;
}

.label {
  flex: 1;
}

.teams {
  display: flex;
  gap: 20px;
}

.team-abbr {
  min-width: 80px;
  text-align: right;
  font-weight: bold;
}

.decisions-list {
  list-style: none;
  padding: 0;
}
</style>  