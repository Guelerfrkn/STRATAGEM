<template>
  <div>
    <label v-if="label">{{ label }}:</label>
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
    default: () => [],
    validator: (arr) => arr.every(opt => opt.value !== undefined && opt.label !== undefined)
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
@import '../styles/DropdownInput.css';
</style>