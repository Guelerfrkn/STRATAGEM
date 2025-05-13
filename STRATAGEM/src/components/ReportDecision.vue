<template>
  <div>
    <div style="display: flex; padding: 4px 8px; border-bottom: 1px solid #ccc;">
      <span style="flex: 1;">{{ label }}</span>
      <div style="display: flex; gap: 20px;">
        <span v-for="(value, index) in values" :key="index" style="min-width: 80px; text-align: right;">
          {{ value }}
        </span>
      </div>
    </div>
    <div v-if="isFirstDecision" style="display: flex; padding: 4px 8px; background-color: #f5f5f5;">
      <span style="flex: 1;"></span>
      <div style="display: flex; gap: 20px;">
        <span v-for="(team, index) in teams" :key="index" style="min-width: 80px; text-align: right; font-weight: bold;">
          {{ team.abbreviation }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  values: {
    type: Array,
    default: () => []
  },
  teams: {
    type: Array,
    default: () => []
  },
  isFirstDecision: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.decision-row {
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.decision-label {
  flex: 1;
  font-weight: 500;
  color: #333;
  padding-right: 1rem;
}

.decision-values {
  flex: 2;
  display: flex;
  gap: 1rem;
}

.decision-value {
  flex: 1;
  text-align: center;
}

.team-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.value {
  font-family: monospace;
  font-size: 1.1rem;
  color: #2c3e50;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}
</style>  