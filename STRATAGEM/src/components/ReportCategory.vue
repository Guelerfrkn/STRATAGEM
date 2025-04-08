<template>
    <div>
      <h2>{{ name }}</h2>
      <div v-for="(subcat, idx) in subcategories" :key="idx">
        <ReportSmallCategory :label="subcat.label" :decisions="subcat.decisions" />
      </div>
    </div>
  </template>
  
  <script setup>
  import ReportSmallCategory from './ReportSmallCategory.vue'
  
  defineProps({
    name: String,
    subcategories: Array
  })
  </script>
  