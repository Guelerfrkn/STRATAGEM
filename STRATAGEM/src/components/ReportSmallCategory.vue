<template>
    <div>
      <h3>{{ label }}</h3>
      <ul style="list-style: none; padding: 0;">
        <li v-for="(decision, index) in decisions" :key="index">
          <ReportDecision :label="decision.label" :value="decision.value" />
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import ReportDecision from './ReportDecision.vue'
  
  defineProps({
    label: String,
    decisions: Array
  })
  </script>  