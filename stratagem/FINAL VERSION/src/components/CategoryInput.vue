<template>
  <section class="category">
    <h2>{{ name }}</h2>
    <SmallCategoryInput
      v-for="(sub, i) in subcategories"
      :key="i"
      :label="sub.label"
      :decisions="sub.decisions"
      :teams="teams"
    />
  </section>
</template>

<script setup>
import SmallCategoryInput from './SmallCategoryInput.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  subcategories: {
    type: Array,
    required: true
  },
  teams: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@import '../styles/CategoryInput.css';

.category { 
  margin-bottom: 3rem 
}

h2 { 
  margin: 1.5rem 0 1rem; 
  font-size: 1.35rem; 
  font-weight: 700 
}
</style>
