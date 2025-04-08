<template>
    <div style="display: flex; justify-content: space-between; padding: 4px 8px; border-bottom: 1px solid #ccc;">
      <span>{{ label }}</span>
      <span>{{ value }}</span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    label: String,
    value: [String, Number]
  })
  </script>  