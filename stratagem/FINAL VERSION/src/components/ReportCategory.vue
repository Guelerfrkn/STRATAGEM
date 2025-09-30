<template>
  <div class="minister-box">
    <h2 class="minister-title">{{ name }}</h2>
    <div class="minister-content">
      <div v-for="(subcat, idx) in subcategories" :key="idx" class="subcategory-section">
        <ReportSmallCategory :label="subcat.label" :decisions="subcat.decisions" :numTeams="numTeams" :teams="teams" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ReportSmallCategory from './ReportSmallCategory.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  subcategories: {
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
.minister-box {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.minister-title {
  background: #7986CB;
  color: white;
  padding: 1rem;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.minister-content {
  padding: 1.5rem;
}

.subcategory-section {
  margin-bottom: 1.5rem;
}

.subcategory-section:last-child {
  margin-bottom: 0;
}
</style>