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
        :maxlength="maxlength"
        :required="required"
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
    maxlength: Number,
    required: Boolean
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
  .text-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .text-input:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  .text-input::placeholder {
    color: #6c757d;
    opacity: 0.7;
  }
  
  .text-input.error {
    border-color: #dc3545;
  }
  
  .text-input.error:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
  }
  </style>