<template>
  <div class="home">
    <h1>Welcome to STRATAGEM</h1>
    
    <div class="game-options">
      <div class="option-card">
        <h2>New Game</h2>
        <p>Start a new game session with custom teams</p>
        <Button @click="startNewGame">Start New Game</Button>
      </div>

      <div class="option-card">
        <h2>Continue Game</h2>
        <p>Load a previously saved game session</p>
        <div v-if="savedGames.length > 0" class="saved-games">
          <div v-for="game in savedGames" :key="game.id" class="saved-game-item">
            <div class="game-info">
              <h3>{{ game.sessionName }}</h3>
              <p>Teams: {{ game.teams.map(t => t.abbreviation).join(', ') }}</p>
              <p>Last played: {{ formatDate(game.lastPlayed) }}</p>
            </div>
            <div class="game-actions">
              <Button @click="continueGame(game.id)">Continue</Button>
              <Button @click="deleteGame(game.id)" class="delete-button">Delete</Button>
            </div>
          </div>
        </div>
        <p v-else class="no-games">No saved games found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from './Button.vue';

const router = useRouter();
const savedGames = ref([]);

onMounted(() => {
  // Load saved games from localStorage
  const games = JSON.parse(localStorage.getItem('savedGames') || '[]');
  savedGames.value = games;
});

const startNewGame = () => {
  router.push('/createTeams');
};

const continueGame = (gameId) => {
  router.push(`/report/${gameId}`);
};

const deleteGame = (gameId) => {
  if (confirm('Are you sure you want to delete this game?')) {
    const games = JSON.parse(localStorage.getItem('savedGames') || '[]');
    const updatedGames = games.filter(game => game.id !== gameId);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
    savedGames.value = updatedGames;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.game-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.option-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.option-card h2 {
  margin-bottom: 1rem;
  color: #333;
}

.option-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.saved-games {
  margin-top: 1rem;
}

.saved-game-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.game-info h3 {
  margin: 0;
  font-size: 1.1rem;
}

.game-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #666;
}

.game-actions {
  display: flex;
  gap: 0.5rem;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.no-games {
  text-align: center;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .game-options {
    grid-template-columns: 1fr;
  }
}
</style> 