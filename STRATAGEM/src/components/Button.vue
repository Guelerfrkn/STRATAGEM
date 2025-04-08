<template>
    <button @click="$emit('click')">
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  // Keine spezifische Logik benötigt, das Klicken wird direkt über das Template gehandhabt.
  </script>
  
  <style scoped>
  button {
    padding: 0.8em 1.5em;
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* Beispiel-Farbe */
    color: white;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>