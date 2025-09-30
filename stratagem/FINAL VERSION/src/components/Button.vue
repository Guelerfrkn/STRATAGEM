<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
@import '../styles/Button.css';
</style>