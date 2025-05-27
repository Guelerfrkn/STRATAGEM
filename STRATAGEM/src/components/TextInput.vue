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
      :class="{ 'input-error': error, 'input-focused': isFocused }"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :required="required"
    />

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="helperText" class="helper-text">{{ helperText }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* inputId **nicht mehr required** → keine Warnung wenn vergessen */
const props = defineProps({
  label      : String,
  modelValue : String,
  placeholder: String,
  rules      : { type: Array,  default: () => [] },
  helperText : String,
  inputId    : { type: String, default: '' },
  maxlength  : Number,
  required   : Boolean
})

const error     = ref('')
const isFocused = ref(false)

function validate () {
  error.value = ''
  for (const rule of props.rules) {
    if (typeof rule === 'function') {
      const msg = rule(props.modelValue)
      if (msg) { error.value = msg; break }
    } else if (rule === 'required' && !props.modelValue.trim()) {
      error.value = 'Dieses Feld ist erforderlich.'
      break
    }
  }
}
</script>

<style scoped>
.input-error {
  border-color: red;
}

.input-focused {
  border-color: blue;
}
</style>
