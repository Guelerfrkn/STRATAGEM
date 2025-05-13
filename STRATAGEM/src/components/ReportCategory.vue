<template>
    <div>
      <h2>{{ name }}</h2>
      <div v-for="(subcat, idx) in subcategories" :key="idx">
        <ReportSmallCategory 
          :label="subcat.label" 
          :decisions="subcat.decisions"
          :numTeams="numTeams"
          :teams="teams"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import ReportSmallCategory from './ReportSmallCategory.vue'
  
  defineProps({
    name: String,
    subcategories: Array,
    numTeams: Number,
    teams: {
      type: Array,
      default: () => []
    }
  })
  </script>
  