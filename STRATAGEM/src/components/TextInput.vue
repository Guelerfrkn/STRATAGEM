<template>
    <div>
      <label v-if="label" :for="inputId">{{ label }}:</label>
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false; validate()"
        :class="{
          'input-error': error,
          'input-focused': isFocused
        }"
        :placeholder="placeholder"
      >
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="helperText && !error" class="helper-text">{{ helperText }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    label: String,
    modelValue: String,
    placeholder: String,
    rules: {
      type: Array,
      default: () => [],
    },
    helperText: String,
    inputId: { // Prop für die ID
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isFocused = ref(false);
  const error = ref('');
  
  const validate = () => {
    error.value = '';
    for (const rule of props.rules) {
      if (typeof rule === 'function') {
        const errorMessage = rule(props.modelValue);
        if (errorMessage) {
          error.value = errorMessage;
          break;
        }
      } else if (rule === 'required' && !props.modelValue.trim()) {
        error.value = 'Dieses Feld ist erforderlich.';
        break;
      }
    }
  };
  </script>
  
  <style scoped>
  /* ... (gleiche Stile wie zuvor) ... */
  </style>