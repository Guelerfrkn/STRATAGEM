<template>
  <div class="decision-row">
    <span class="decision-label">{{ label }}</span>
    <div class="decision-inputs">
      <TextInput
        v-for="(val, idx) in modelValue"
        :key="idx"
        :inputId="`${label}-${idx}`"
        :modelValue="modelValue[idx]"
        @update:modelValue="v => updateValue(idx, v)"
      />
    </div>
  </div>
</template>

<script setup>
import TextInput from './TextInput.vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  modelValue: { 
    type: Array, 
    default: () => [] 
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(i, v) {
  const clone = [...props.modelValue]
  clone[i] = v
  emit('update:modelValue', clone)
}
</script>

<style scoped>
.decision-row {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0.4rem 0.8rem;
}

.decision-label {
  flex: 1;
  padding-right: 1rem;
}

.decision-inputs {
  flex: 2;
  display: flex;
  gap: 1rem;
}
</style>
