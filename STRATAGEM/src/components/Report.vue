<template>
    <div class="report-container">
      <Header />
  
      <main>
        <div class="header-section">
          <h1>Stratagem Report - {{ gameSession?.sessionName || 'New Game' }}</h1>
          <Button @click="scrollToBottom" class="scroll-button">
            Scroll to Bottom
          </Button>
        </div>
        <div>
          <ReportCategory
            v-for="(category, index) in categories"
            :key="index"
            :name="category.name"
            :subcategories="category.subcategories"
            :numTeams="numTeams"
            :teams="gameSession?.teams || []"
          />
        </div>
        <div class="bottom-navigation">
          <Button @click="goToEnterDecisions" class="enter-decisions-button">
            Enter Decisions
          </Button>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ReportCategory from './ReportCategory.vue'
  import Button from './Button.vue'
  
  const route = useRoute()
  const router = useRouter()
  const props = defineProps({
    gameId: {
      type: String,
      required: false
    }
  });
  
  const gameSession = ref(null);
  const numTeams = ref(1);
  const categories = ref([]);
  const teams = ref([]);
  
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  
  const goToEnterDecisions = () => {
    router.push(`/enter-decisions/${route.params.id}`);
  };
  
  onMounted(() => {
    if (props.gameId) {
      // Load existing game
      const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
      const game = savedGames.find(g => g.id === props.gameId);
      if (game) {
        gameSession.value = game;
        numTeams.value = game.teams.length;
        categories.value = game.gameState.categories;
        teams.value = game.teams;
        console.log('Loaded game state:', game.gameState.categories); // Debug log
      } else {
        console.error('Game not found:', props.gameId); // Debug log
      }
    } else {
      // New game - load default state
      const teams = JSON.parse(localStorage.getItem('teams') || '[]');
      numTeams.value = teams.length || 1;
      // Initialize with default categories
      categories.value = [
        {
          name: "Population Minister",
          subcategories: [
            {
              label: "Current Situation",
              decisions: [
                { label: "P1 Population", values: Array(numTeams.value).fill(200) },
                { label: "P2 Total Food Available", values: Array(numTeams.value).fill(3300) },
                { label: "P3 Total Goods Available", values: Array(numTeams.value).fill(3500) }
              ]
            },
            {
              label: "Useful Information",
              decisions: [
                { label: "P4 Food Per Capita", values: Array(numTeams.value).fill(2) },
                { label: "P5 Goods Per Capita", values: Array(numTeams.value).fill(2) },
                { label: "P6 Social Services Capital Per Capita", values: Array(numTeams.value).fill(2.25) },
                { label: "P7 Annual Births Per 1000", values: Array(numTeams.value).fill(41) }
              ]
            }
          ]
        },
        {
          name: "Energy Minister",
          subcategories: [
            {
              label: "Current Situation",
              decisions: [
                { label: "E1 Worn Out Energy Production Capital", values: Array(numTeams.value).fill(160) },
                { label: "E2 New Energy Production Capital", values: Array(numTeams.value).fill(640) },
                { label: "E3 Total Producing Energy Production Capital", values: Array(numTeams.value).fill(800) },
                { label: "E4 Worn Out Energy Efficiency Capital", values: Array(numTeams.value).fill(0) },
                { label: "E5 New Energy Efficiency Capital", values: Array(numTeams.value).fill(0) },
                { label: "E6 Total Producing Energy Efficiency Capital", values: Array(numTeams.value).fill(0) },
                { label: "E7 Total Energy Available", values: Array(numTeams.value).fill(15000) }
              ]
            },
            {
              label: "Useful Information",
              decisions: [
                { label: "E8 Energy Required Per Unit of Goods for Population", values: Array(numTeams.value).fill(0.2) },
                { label: "E9 Energy for Population", values: Array(numTeams.value).fill(400) },
                { label: "E10 Energy Consumption Multiplier", values: Array(numTeams.value).fill(1) },
                { label: "E11 Energy Required Per Unit of Food Production Capital", values: Array(numTeams.value).fill(12.5) },
                { label: "E12 Energy Required for Full Use of Food Production Capital", values: Array(numTeams.value).fill(10000) },
                { label: "E13 Energy Required Per Unit of Goods Production Capital", values: Array(numTeams.value).fill(20) },
                { label: "E14 Energy Required for Full Use of Goods Production Capital", values: Array(numTeams.value).fill(6000) },
                { label: "E15 Total Energy Required for Production", values: Array(numTeams.value).fill(16000) },
                { label: "E16 Average Energy Per Unit Energy Production Capital", values: Array(numTeams.value).fill(17.5) },
                { label: "E17 Energy Production This Cycle", values: Array(numTeams.value).fill(14000) },
                { label: "E18 Energy Exports", values: Array(numTeams.value).fill(0) },
                { label: "E19 Energy Imports", values: Array(numTeams.value).fill(1000) }
              ]
            }
          ]
        },
        {
          name: "Goods and Services Minister",
          subcategories: [
            {
              label: "Current Situation",
              decisions: [
                { label: "G1 Worn Out Goods Production Capital", values: Array(numTeams.value).fill(60) },
                { label: "G2 New Goods Production Capital", values: Array(numTeams.value).fill(240) },
                { label: "G3 Total Producing Goods Production Capital", values: Array(numTeams.value).fill(300) },
                { label: "G4 Worn Out Social Services Capital", values: Array(numTeams.value).fill(50) },
                { label: "G5 New Social Services Capital", values: Array(numTeams.value).fill(400) },
                { label: "G6 Total Producing Social Services Capital", values: Array(numTeams.value).fill(240) }
              ]
            },
            {
              label: "Useful Information",
              decisions: [
                { label: "G7 Goods Production Capital Per Labourer", values: Array(numTeams.value).fill(6) },
                { label: "G8 Goods Production Multiplier from Goods Production Capital", values: Array(numTeams.value).fill(5) },
                { label: "G9 Social Services Capital Per Capital", values: Array(numTeams.value).fill(2.25) },
                { label: "G10 Labout Output Multiplier from Social Services", values: Array(numTeams.value).fill(2.13) },
                { label: "G11 Capacity Utilization", values: Array(numTeams.value).fill(1) },
                { label: "G12 Good Production", values: Array(numTeams.value).fill(3000) },
                { label: "G13 Goods Export", values: Array(numTeams.value).fill(0) },
                { label: "G14 Goods Imports", values: Array(numTeams.value).fill(500) },
                { label: "G15 Expected Goods Production", values: Array(numTeams.value).fill(3100) },
                { label: "G16 Total Goods Available", values: Array(numTeams.value).fill(3500) },
                { label: "G17 Total Worn Out Capital", values: Array(numTeams.value).fill(430) }
              ]
            }
          ]
        },
        {
          name: "Food and Environment Minister",
          subcategories: [
            {
              label: "Current Situation",
              decisions: [
                { label: "F1 Worn Out Food Production Capital", values: Array(numTeams.value).fill(160) },
                { label: "F2 New Food Production Capital", values: Array(numTeams.value).fill(640) },
                { label: "F3 Total Producing Food Production Capital", values: Array(numTeams.value).fill(800) },
                { label: "F4 Worn Out Environmental Protection Capital", values: Array(numTeams.value).fill(0) },
                { label: "F5 New Environmental Protection Capital", values: Array(numTeams.value).fill(0) },
                { label: "F6 Total Producing Environmental Protection Capital", values: Array(numTeams.value).fill(0) }
              ]
            },
            {
              label: "Useful Information",
              decisions: [
                { label: "F7 Quality of the Environment", values: Array(numTeams.value).fill(0.69) },
                { label: "F8 Ratio of Food Production Capital to Ag. Land Area", values: Array(numTeams.value).fill(0.8) },
                { label: "F9 Expected Food Production", values: Array(numTeams.value).fill(3450) },
                { label: "F10 Capacity Utilization", values: Array(numTeams.value).fill(1) },
                { label: "F11 Food Production", values: Array(numTeams.value).fill(3300) },
                { label: "F12 Food Exports", values: Array(numTeams.value).fill(1550) },
                { label: "F13 Food Imports", values: Array(numTeams.value).fill(0) }
              ]
            }
          ]
        },
        {
          name: "Trade and Finance Minister",
          subcategories: [
            {
              label: "Current Situation",
              decisions: [
                { label: "TFI Debt", values: Array(numTeams.value).fill(0) }
              ]
            },
            {
              label: "Useful Information",
              decisions: [
                { label: "TF2 Interest Rate", values: Array(numTeams.value).fill(0.1) },
                { label: "TF3 Price Multiplier for Imports", values: Array(numTeams.value).fill(1) },
                { label: "TF4 Interest Charges", values: Array(numTeams.value).fill(0) },
                { label: "TF5 Maximum Loan Available", values: Array(numTeams.value).fill(1000) },
                { label: "TF6 Price of Imported Energy", values: Array(numTeams.value).fill(1) },
                { label: "TF7 Price of Imported Goods", values: Array(numTeams.value).fill(1.1) },
                { label: "TF8 Price of Imported Food", values: Array(numTeams.value).fill(1.1) }
              ]
            }
          ]
        },
        {
          name: "Summary",
          subcategories: [
            {
              label: "Summary of all Stats",
              decisions: [
                { label: "S1 Population (P1)", values: Array(numTeams.value).fill(200) },
                { label: "S2 Food Per Capita (P4)", values: Array(numTeams.value).fill(2) },
                { label: "S3 Goods Per Capita (P6)", values: Array(numTeams.value).fill(2) },
                { label: "S4 Population Growth Rate ((P8-P5)/1000)", values: Array(numTeams.value).fill(0.023) },
                { label: "S5 Debt (TF1)", values: Array(numTeams.value).fill(0) },
                { label: "S6 Quality of the Environment (F7)", values: Array(numTeams.value).fill(0.69) },
                { label: "S7 Energy Consumption Multiplier (E10)", values: Array(numTeams.value).fill(1) },
                { label: "S8 Average Food Capital Productivity (F9/F3)", values: Array(numTeams.value).fill(4.3) },
                { label: "S9 Average Goods Capital Productivity (G15/(G3+G6))", values: Array(numTeams.value).fill(4.1) },
                { label: "S10 Average Energy Capital Productivity (E17/E3)", values: Array(numTeams.value).fill(17.5) },
                { label: "S11 Total Food Available (P2)", values: Array(numTeams.value).fill(3300) },
                { label: "S12 Total Goods Available (P3)", values: Array(numTeams.value).fill(3500) },
                { label: "S13 Total Energy Available (E7)", values: Array(numTeams.value).fill(15000) },
                { label: "S14 Average Exports", values: Array(numTeams.value).fill(1000) }
              ]
            }
          ]
        }
      ];
      teams.value = JSON.parse(localStorage.getItem('teams') || '[]');
      console.log('Initialized default categories:', categories.value); // Debug log
    }
  });
  </script>
  
  <style scoped>
  .report-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  
  h1 {
    color: #2c3e50;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .scroll-button {
    background-color: #4a90e2;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-left: 1rem;
  }
  
  .scroll-button:hover {
    background-color: #357abd;
  }
  
  .category {
    margin-bottom: 3rem;
  }
  
  .bottom-navigation {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
    padding: 2rem 0;
    border-top: 1px solid #e0e0e0;
  }
  
  .enter-decisions-button {
    background-color: #2ecc71;
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .enter-decisions-button:hover {
    background-color: #27ae60;
  }
  </style>
  