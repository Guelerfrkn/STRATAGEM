<template>
  <div class="small-category">
    <div class="header">
      <span class="label">{{ label }}</span>
      <div class="teams">
        <span v-for="(team, index) in teams" :key="index" class="team-abbr">
          {{ team.abbreviation }}
        </span>
      </div>
    </div>
    <ul class="decisions-list">
      <li v-for="(decision, index) in decisions" :key="index">
        <ReportDecision :label="decision.label" :values="decision.values" :teams="teams" :isFirstDecision="false" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import ReportDecision from './ReportDecision.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  decisions: {
    type: Array,
    required: true
  },
  numTeams: {
    type: Number,
    required: true
  },
  teams: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.small-category {
  background: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
}

.header {
  display: flex;
  padding: 0.75rem 1rem;
  background-color: #e9ecef;
  border-bottom: 1px solid #dee2e6;
}

.label {
  flex: 1;
  font-weight: 600;
  color: #2c3e50;
}

.teams {
  display: flex;
  gap: 20px;
}

.team-abbr {
  min-width: 80px;
  text-align: right;
  font-weight: bold;
  color: #495057;
}

.decisions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.decisions-list li {
  background: transparent;
  transition: background 0.3s;
  border-bottom: 1px solid #e9ecef;
}

.decisions-list li:last-child {
  border-bottom: none;
}

.decisions-list li:hover {
  background: #e9ecef;
}
</style>