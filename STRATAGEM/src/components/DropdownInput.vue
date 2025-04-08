<template>
    <div>
      <label v-if="label">{{ label }}:</label>
      <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    label: String,
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true,
      default: () => [],
      validator: (arr) => arr.every(opt => opt.value !== undefined && opt.label !== undefined),
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  div {
    margin-bottom: 1em;
  }
  
  label {
    display: inline-block;
    margin-right: 0.5em;
  }
  
  select {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1em;
  }
  </style>