<template>
  <div class="enter-decisions">
    <main>
      <h1>Enter Decisions - {{ gameSession?.sessionName || 'New Game' }}</h1>
      <div class="content">
        <!-- Content will be added here -->
        <p>Enter Decisions page content coming soon...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const gameSession = ref(null);

onMounted(() => {
  // Load game state from localStorage
  const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
  const game = savedGames.find(g => g.id === route.params.id);
  
  if (game) {
    gameSession.value = game;
  }
});
</script>

<style scoped>
.enter-decisions {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
