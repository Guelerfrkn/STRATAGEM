<template>
  <div class="enter-container">
    <h1>
      Enter Decisions – {{ gameSession?.sessionName }} •
      Round {{ currentRound }}
    </h1>

    <!-- Team Abbreviations Header -->
    <div class="team-header">
      <span class="decision-label">Decision</span>
      <div class="team-values">
        <span v-for="team in gameSession?.teams" :key="team.abbreviation" class="team-value">
          {{ team.abbreviation }}
        </span>
      </div>
    </div>

    <!-- Decision Categories -->
    <div v-for="(category, idx) in categories" :key="idx" class="decision-category">
      <h2>Decision #{{ idx + 1 }}</h2>
      <div v-for="(decision, dIdx) in category.decisions" :key="dIdx" class="decision-row">
        <span class="decision-label" :title="getTooltip(decision.label)">{{ decision.label }}</span>
        <div class="decision-values">
          <div v-for="(value, vIdx) in decision.values" :key="vIdx" class="input-wrapper">
            <input
              type="text"
              v-model="decision.values[vIdx]"
              :disabled="decision.label === 'Total Unallocated'"
              class="decision-input"
              :class="{ 'error': hasError(decision.values[vIdx], decision.label) }"
              @input="validateInput($event, decision.values, vIdx)"
              @blur="validateInput($event, decision.values, vIdx, true)"
            />
            <span v-if="hasError(decision.values[vIdx], decision.label)" class="error-message">
              {{ getErrorMessage(decision.values[vIdx], decision.label) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="save-bar">
      <Button @click="handleSave" :disabled="hasAnyErrors">Save Decisions</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from './Button.vue'

/* ---------- basics ------------------------------------------------ */
const route = useRoute()
const router = useRouter()
const gameSession = ref(null)

/* ---------- categories -------------------------------------------- */
const categories = ref([
  {
    name: 'Decision #1',
    decisions: [
      { label: 'P9 - Food For Population', values: [] },
      { label: 'P10 - Food For Export', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #2',
    decisions: [
      { label: 'P11 - Food For Import', values: [] },
      { label: 'P12 - Food For Capital', values: [] },
      { label: 'P13 - Food For Environment', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #3',
    decisions: [
      { label: 'E20 - Energy For Population', values: [] },
      { label: 'E21 - Energy For Food Production', values: [] },
      { label: 'E22 - Energy For Goods Production', values: [] },
      { label: 'E23 - Energy For Export', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #4',
    decisions: [
      { label: 'E24 - Energy For Import', values: [] },
      { label: 'E25 - Energy For Capital', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #5',
    decisions: [
      { label: 'E26 - Energy For Environment', values: [] },
      { label: 'E27 - Energy For Efficiency', values: [] },
      { label: 'G18 - Goods For Population', values: [] },
      { label: 'G19 - Goods For Export', values: [] },
      { label: 'F14 - Goods For Import', values: [] },
      { label: 'F15 - Goods For Capital', values: [] },
      { label: 'Total Unallocated', values: [] }
    ]
  },
  {
    name: 'Decision #6',
    decisions: [
      { label: 'TF9 - Goods For Environment', values: [] },
      { label: 'TF10 - Goods For Social Services', values: [] },
      { label: 'TF11 - Goods For Efficiency', values: [] },
      { label: 'TF12 - Goods For Energy Production', values: [] }
    ]
  },
  {
    name: 'Decision #7',
    decisions: [
      { label: 'TF13 - New Food Production Capital', values: [] }
    ]
  },
  {
    name: 'Decision #8',
    decisions: [
      { label: 'TF14 - New Goods Production Capital', values: [] }
    ]
  },
  {
    name: 'Decision #9',
    decisions: [
      { label: 'TF15 - New Social Services Capital', values: [] },
      { label: 'TF16 - New Environmental Protection Capital', values: [] },
      { label: 'TF17 - New Energy Production Capital', values: [] },
      { label: 'TF18 - New Energy Efficiency Capital', values: [] }
    ]
  }
])

const currentRound = computed(() =>
  gameSession.value?.history.at(-1).round || 1
)

/* ---------- decision values storage -------------------------------------------- */
const decisionValues = computed(() => {
  const values = {
    food: {
      population: [], // P9
      export: [],    // P10
      import: [],    // P11
      capital: [],   // P12
      environment: [] // P13
    },
    energy: {
      population: [],      // E20
      foodProduction: [],  // E21
      goodsProduction: [], // E22
      export: [],         // E23
      import: [],         // E24
      capital: [],        // E25
      environment: [],    // E26
      efficiency: []      // E27
    },
    goods: {
      population: [],           // G18
      export: [],              // G19
      import: [],              // F14
      capital: [],             // F15
      environment: [],         // TF9
      socialServices: [],      // TF10
      efficiency: [],          // TF11
      energyProduction: []     // TF12
    },
    capital: {
      foodProduction: [],           // TF13
      goodsProduction: [],          // TF14
      socialServices: [],           // TF15
      environmentalProtection: [],  // TF16
      energyProduction: [],         // TF17
      energyEfficiency: []          // TF18
    }
  }

  // Helper function to get values from a decision
  const getValues = (categoryIndex, decisionIndex) => {
    return categories.value[categoryIndex].decisions[decisionIndex].values
  }

  // Food decisions
  values.food.population = getValues(0, 0)    // P9
  values.food.export = getValues(0, 1)        // P10
  values.food.import = getValues(1, 0)        // P11
  values.food.capital = getValues(1, 1)       // P12
  values.food.environment = getValues(1, 2)   // P13

  // Energy decisions
  values.energy.population = getValues(2, 0)      // E20
  values.energy.foodProduction = getValues(2, 1)  // E21
  values.energy.goodsProduction = getValues(2, 2) // E22
  values.energy.export = getValues(2, 3)         // E23
  values.energy.import = getValues(3, 0)         // E24
  values.energy.capital = getValues(3, 1)        // E25
  values.energy.environment = getValues(4, 0)    // E26
  values.energy.efficiency = getValues(4, 1)     // E27

  // Goods decisions
  values.goods.population = getValues(4, 2)           // G18
  values.goods.export = getValues(4, 3)              // G19
  values.goods.import = getValues(4, 4)              // F14
  values.goods.capital = getValues(4, 5)             // F15
  values.goods.environment = getValues(5, 0)         // TF9
  values.goods.socialServices = getValues(5, 1)      // TF10
  values.goods.efficiency = getValues(5, 2)          // TF11
  values.goods.energyProduction = getValues(5, 3)    // TF12

  // Capital decisions
  values.capital.foodProduction = getValues(6, 0)           // TF13
  values.capital.goodsProduction = getValues(7, 0)          // TF14
  values.capital.socialServices = getValues(8, 0)           // TF15
  values.capital.environmentalProtection = getValues(8, 1)  // TF16
  values.capital.energyProduction = getValues(8, 2)         // TF17
  values.capital.energyEfficiency = getValues(8, 3)         // TF18

  return values
})

/* ---------- helpers ----------------------------------------------- */
const deepClone = (o) => JSON.parse(JSON.stringify(toRaw(o)))

const getTooltip = (label) => {
  const tooltips = {
    'P9 - Food For Population': 'Amount of food allocated to feed the population',
    'P10 - Food For Export': 'Amount of food allocated for export',
    'P11 - Food For Import': 'Amount of food to be imported',
    'P12 - Food For Capital': 'Amount of food allocated for capital maintenance',
    'P13 - Food For Environment': 'Amount of food allocated for environmental protection',
    'E20 - Energy For Population': 'Energy allocated for population needs',
    'E21 - Energy For Food Production': 'Energy allocated for food production',
    'E22 - Energy For Goods Production': 'Energy allocated for goods production',
    'E23 - Energy For Export': 'Energy allocated for export',
    'E24 - Energy For Import': 'Energy to be imported',
    'E25 - Energy For Capital': 'Energy allocated for capital maintenance',
    'E26 - Energy For Environment': 'Energy allocated for environmental protection',
    'E27 - Energy For Efficiency': 'Energy allocated for efficiency improvements',
    'G18 - Goods For Population': 'Goods allocated for population needs',
    'G19 - Goods For Export': 'Goods allocated for export',
    'F14 - Goods For Import': 'Goods to be imported',
    'F15 - Goods For Capital': 'Goods allocated for capital maintenance',
    'TF9 - Goods For Environment': 'Goods allocated for environmental protection',
    'TF10 - Goods For Social Services': 'Goods allocated for social services',
    'TF11 - Goods For Efficiency': 'Goods allocated for efficiency improvements',
    'TF12 - Goods For Energy Production': 'Goods allocated for energy production',
    'TF13 - New Food Production Capital': 'Investment in new food production facilities',
    'TF14 - New Goods Production Capital': 'Investment in new goods production facilities',
    'TF15 - New Social Services Capital': 'Investment in new social services facilities',
    'TF16 - New Environmental Protection Capital': 'Investment in new environmental protection facilities',
    'TF17 - New Energy Production Capital': 'Investment in new energy production facilities',
    'TF18 - New Energy Efficiency Capital': 'Investment in new energy efficiency facilities',
    'Total Unallocated': 'Remaining amount that has not been allocated to any specific use'
  }
  return tooltips[label] || 'No description available'
}

/* ---------- load --------------------------------------------------- */
onMounted(() => {
  const id = route.params.id
  const list = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const game = list.find(g => g.id === id)

  if (!game) {
    alert('Game not found – returning home')
    router.push('/')
    return
  }
  gameSession.value = game

  // Initialize values array for each decision based on number of teams
  categories.value.forEach(category => {
    category.decisions.forEach(decision => {
      // Set default values based on the decision type
      const defaultValues = {
        'P9 - Food For Population': 1000,
        'P10 - Food For Export': 500,
        'P11 - Food For Import': 0,
        'P12 - Food For Capital': 200,
        'P13 - Food For Environment': 100,
        'E20 - Energy For Population': 400,
        'E21 - Energy For Food Production': 3000,
        'E22 - Energy For Goods Production': 2000,
        'E23 - Energy For Export': 500,
        'E24 - Energy For Import': 1000,
        'E25 - Energy For Capital': 1000,
        'E26 - Energy For Environment': 500,
        'E27 - Energy For Efficiency': 500,
        'G18 - Goods For Population': 1000,
        'G19 - Goods For Export': 500,
        'F14 - Goods For Import': 500,
        'F15 - Goods For Capital': 500,
        'TF9 - Goods For Environment': 200,
        'TF10 - Goods For Social Services': 300,
        'TF11 - Goods For Efficiency': 200,
        'TF12 - Goods For Energy Production': 300,
        'TF13 - New Food Production Capital': 100,
        'TF14 - New Goods Production Capital': 100,
        'TF15 - New Social Services Capital': 100,
        'TF16 - New Environmental Protection Capital': 100,
        'TF17 - New Energy Production Capital': 100,
        'TF18 - New Energy Efficiency Capital': 100
      }

      if (decision.label === 'Total Unallocated') {
        decision.values = Array(game.teams.length).fill('')
      } else {
        decision.values = Array(game.teams.length).fill(defaultValues[decision.label] || 0)
      }
    })
  })
})

/* ---------- validation -------------------------------------------- */
const hasError = (value, label) => {
  // Skip validation for Total Unallocated fields
  if (label === 'Total Unallocated') return false
  if (value === '') return true
  if (isNaN(value)) return true
  if (value < 0) return true
  return false
}

const getErrorMessage = (value, label) => {
  // Skip error message for Total Unallocated fields
  if (label === 'Total Unallocated') return ''
  if (value === '') return 'Required'
  if (isNaN(value)) return 'Numbers only'
  if (value < 0) return 'Must be positive'
  return ''
}

const validateInput = (event, values, index, isBlur = false) => {
  const value = event.target.value
  // Allow empty during typing, but validate on blur
  if (!isBlur && value === '') return

  // Remove any non-numeric characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '')

  // Ensure only one decimal point
  const parts = numericValue.split('.')
  if (parts.length > 2) {
    values[index] = parts[0] + '.' + parts.slice(1).join('')
  } else {
    values[index] = numericValue
  }
}

const hasAnyErrors = computed(() => {
  return categories.value.some(category =>
    category.decisions.some(decision =>
      decision.values.some(value => hasError(value, decision.label))
    )
  )
})

/* ---------- calculations -------------------------------------------- */
const calculateNextRound = (currentRound) => {
  const round = currentRound.categories
  const nextRound = deepClone(currentRound)

  // Helper function to get decision values
  const getDecisionValue = (categoryName, decisionLabel) => {
    const category = round.find(c => c.name === categoryName)
    if (!category) return 0
    const subcategory = category.subcategories.find(s => s.label === 'Useful Information')
    if (!subcategory) return 0
    const decision = subcategory.decisions.find(d => d.label === decisionLabel)
    return decision ? decision.values[0] : 0
  }

  // Calculate Population changes
  const population = getDecisionValue('Population Minister', 'P1 Population')
  const foodPerCapita = getDecisionValue('Population Minister', 'P4 Food Per Capita')
  const goodsPerCapita = getDecisionValue('Population Minister', 'P5 Goods Per Capita')
  const socialServicesPerCapita = getDecisionValue('Population Minister', 'P6 Social Services Capital Per Capita')
  const birthsPer1000 = getDecisionValue('Population Minister', 'P7 Annual Births Per 1000')

  // Calculate new population based on living conditions
  const populationGrowth = (foodPerCapita > 1.5 && goodsPerCapita > 1.5 && socialServicesPerCapita > 1.5)
    ? birthsPer1000 / 1000
    : (foodPerCapita > 1 && goodsPerCapita > 1)
      ? (birthsPer1000 * 0.5) / 1000
      : 0

  const newPopulation = Math.round(population * (1 + populationGrowth))

  // Calculate Food Production
  const foodForPopulation = getDecisionValue('Population Minister', 'P9 Food For Population')
  const foodForExport = getDecisionValue('Population Minister', 'P10 Food For Export')
  const foodForImport = getDecisionValue('Population Minister', 'P11 Food For Import')
  const foodForCapital = getDecisionValue('Population Minister', 'P12 Food For Capital')
  const foodForEnvironment = getDecisionValue('Population Minister', 'P13 Food For Environment')

  const energyForFood = getDecisionValue('Energy Minister', 'E21 Energy For Food Production')
  const foodProductionCapital = getDecisionValue('Food and Environment Minister', 'F3 Total Producing Food Production Capital')

  // Food production efficiency based on energy and capital
  const foodProductionEfficiency = Math.min(1, (energyForFood / (foodProductionCapital * 12.5)))
  const baseFoodProduction = foodProductionCapital * 4.3 // Base productivity
  const newFoodProduction = Math.round(baseFoodProduction * foodProductionEfficiency)

  // Calculate Energy Production
  const energyForPopulation = getDecisionValue('Energy Minister', 'E20 Energy For Population')
  const energyForGoods = getDecisionValue('Energy Minister', 'E22 Energy For Goods Production')
  const energyForExport = getDecisionValue('Energy Minister', 'E23 Energy For Export')
  const energyForImport = getDecisionValue('Energy Minister', 'E24 Energy For Import')
  const energyForCapital = getDecisionValue('Energy Minister', 'E25 Energy For Capital')
  const energyForEnvironment = getDecisionValue('Energy Minister', 'E26 Energy For Environment')
  const energyForEfficiency = getDecisionValue('Energy Minister', 'E27 Energy For Efficiency')

  const energyProductionCapital = getDecisionValue('Energy Minister', 'E3 Total Producing Energy Production Capital')
  const energyEfficiencyCapital = getDecisionValue('Energy Minister', 'E6 Total Producing Energy Efficiency Capital')

  // Energy production with efficiency improvements
  const baseEnergyProduction = energyProductionCapital * 17.5
  const efficiencyBonus = 1 + (energyEfficiencyCapital * 0.1)
  const newEnergyProduction = Math.round(baseEnergyProduction * efficiencyBonus)

  // Calculate Goods Production
  const goodsForPopulation = getDecisionValue('Goods and Services Minister', 'G18 Goods For Population')
  const goodsForExport = getDecisionValue('Goods and Services Minister', 'G19 Goods For Export')
  const goodsForImport = getDecisionValue('Food and Environment Minister', 'F14 Goods For Import')
  const goodsForCapital = getDecisionValue('Food and Environment Minister', 'F15 Goods For Capital')
  const goodsForEnvironment = getDecisionValue('Trade and Finance Minister', 'TF9 Goods For Environment')
  const goodsForSocialServices = getDecisionValue('Trade and Finance Minister', 'TF10 Goods For Social Services')
  const goodsForEfficiency = getDecisionValue('Trade and Finance Minister', 'TF11 Goods For Efficiency')
  const goodsForEnergyProduction = getDecisionValue('Trade and Finance Minister', 'TF12 Goods For Energy Production')

  const goodsProductionCapital = getDecisionValue('Goods and Services Minister', 'G3 Total Producing Goods Production Capital')
  const socialServicesCapital = getDecisionValue('Goods and Services Minister', 'G6 Total Producing Social Services Capital')

  // Goods production with social services bonus
  const socialServicesBonus = 1 + (socialServicesCapital * 0.05)
  const baseGoodsProduction = goodsProductionCapital * 5
  const newGoodsProduction = Math.round(baseGoodsProduction * socialServicesBonus)

  // Calculate Capital Changes
  const newFoodCapital = getDecisionValue('Trade and Finance Minister', 'TF13 New Food Production Capital')
  const newGoodsCapital = getDecisionValue('Trade and Finance Minister', 'TF14 New Goods Production Capital')
  const newSocialServicesCapital = getDecisionValue('Trade and Finance Minister', 'TF15 New Social Services Capital')
  const newEnvironmentalCapital = getDecisionValue('Trade and Finance Minister', 'TF16 New Environmental Protection Capital')
  const newEnergyProductionCapital = getDecisionValue('Trade and Finance Minister', 'TF17 New Energy Production Capital')
  const newEnergyEfficiencyCapital = getDecisionValue('Trade and Finance Minister', 'TF18 New Energy Efficiency Capital')

  // Update next round values
  nextRound.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.decisions.forEach(decision => {
        // Update population-related values
        if (decision.label === 'P1 Population') {
          decision.values = decision.values.map(() => newPopulation)
        }
        // Update food-related values
        else if (decision.label === 'P2 Total Food Available') {
          decision.values = decision.values.map(() => newFoodProduction)
        }
        // Update goods-related values
        else if (decision.label === 'P3 Total Goods Available') {
          decision.values = decision.values.map(() => newGoodsProduction)
        }
        // Update per capita values
        else if (decision.label === 'P4 Food Per Capita') {
          decision.values = decision.values.map(() => newFoodProduction / newPopulation)
        }
        else if (decision.label === 'P5 Goods Per Capita') {
          decision.values = decision.values.map(() => newGoodsProduction / newPopulation)
        }
        // Update capital values
        else if (decision.label === 'E2 New Energy Production Capital') {
          decision.values = decision.values.map(() => newEnergyProductionCapital)
        }
        else if (decision.label === 'E5 New Energy Efficiency Capital') {
          decision.values = decision.values.map(() => newEnergyEfficiencyCapital)
        }
        else if (decision.label === 'G2 New Goods Production Capital') {
          decision.values = decision.values.map(() => newGoodsCapital)
        }
        else if (decision.label === 'G5 New Social Services Capital') {
          decision.values = decision.values.map(() => newSocialServicesCapital)
        }
        else if (decision.label === 'F2 New Food Production Capital') {
          decision.values = decision.values.map(() => newFoodCapital)
        }
        else if (decision.label === 'F5 New Environmental Protection Capital') {
          decision.values = decision.values.map(() => newEnvironmentalCapital)
        }
      })
    })
  })

  return nextRound
}

/* ---------- save --------------------------------------------------- */
let saving = false

function handleSave() {
  if (saving || hasAnyErrors.value) return
  saving = true

  // Convert string values to numbers
  categories.value.forEach(c =>
    c.decisions.forEach(d =>
        d.values = d.values.map(v => (v === '' ? '' : Number(v)))
    )
  )

  // Create the original category structure for the report page
  const reportCategories = [
    {
      name: 'Population Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'P1 Population', values: Array(gameSession.value.teams.length).fill(200) },
            { label: 'P2 Total Food Available', values: Array(gameSession.value.teams.length).fill(3300) },
            { label: 'P3 Total Goods Available', values: Array(gameSession.value.teams.length).fill(3500) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'P4 Food Per Capita', values: Array(gameSession.value.teams.length).fill(2) },
            { label: 'P5 Goods Per Capita', values: Array(gameSession.value.teams.length).fill(2) },
            { label: 'P6 Social Services Capital Per Capita', values: Array(gameSession.value.teams.length).fill(2.25) },
            { label: 'P7 Annual Births Per 1000', values: Array(gameSession.value.teams.length).fill(41) },
            { label: 'P9 Food For Population', values: decisionValues.value.food.population },
            { label: 'P10 Food For Export', values: decisionValues.value.food.export },
            { label: 'P11 Food For Import', values: decisionValues.value.food.import },
            { label: 'P12 Food For Capital', values: decisionValues.value.food.capital },
            { label: 'P13 Food For Environment', values: decisionValues.value.food.environment }
          ]
        }
      ]
    },
    {
      name: 'Energy Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'E1 Worn Out Energy Production Capital', values: Array(gameSession.value.teams.length).fill(160) },
            { label: 'E2 New Energy Production Capital', values: Array(gameSession.value.teams.length).fill(640) },
            { label: 'E3 Total Producing Energy Production Capital', values: Array(gameSession.value.teams.length).fill(800) },
            { label: 'E4 Worn Out Energy Efficiency Capital', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'E5 New Energy Efficiency Capital', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'E6 Total Producing Energy Efficiency Capital', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'E7 Total Energy Available', values: Array(gameSession.value.teams.length).fill(15000) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'E8 Energy Required Per Unit of Goods for Population', values: Array(gameSession.value.teams.length).fill(0.2) },
            { label: 'E9 Energy for Population', values: Array(gameSession.value.teams.length).fill(400) },
            { label: 'E10 Energy Consumption Multiplier', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'E11 Energy Required Per Unit of Food Production Capital', values: Array(gameSession.value.teams.length).fill(12.5) },
            { label: 'E12 Energy Required for Full Use of Food Production Capital', values: Array(gameSession.value.teams.length).fill(10000) },
            { label: 'E13 Energy Required Per Unit of Goods Production Capital', values: Array(gameSession.value.teams.length).fill(20) },
            { label: 'E14 Energy Required for Full Use of Goods Production Capital', values: Array(gameSession.value.teams.length).fill(6000) },
            { label: 'E15 Total Energy Required for Production', values: Array(gameSession.value.teams.length).fill(16000) },
            { label: 'E16 Average Energy Per Unit Energy Production Capital', values: Array(gameSession.value.teams.length).fill(17.5) },
            { label: 'E17 Energy Production This Cycle', values: Array(gameSession.value.teams.length).fill(14000) },
            { label: 'E18 Energy Exports', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'E19 Energy Imports', values: Array(gameSession.value.teams.length).fill(1000) },
            { label: 'E20 Energy For Population', values: decisionValues.value.energy.population },
            { label: 'E21 Energy For Food Production', values: decisionValues.value.energy.foodProduction },
            { label: 'E22 Energy For Goods Production', values: decisionValues.value.energy.goodsProduction },
            { label: 'E23 Energy For Export', values: decisionValues.value.energy.export },
            { label: 'E24 Energy For Import', values: decisionValues.value.energy.import },
            { label: 'E25 Energy For Capital', values: decisionValues.value.energy.capital },
            { label: 'E26 Energy For Environment', values: decisionValues.value.energy.environment },
            { label: 'E27 Energy For Efficiency', values: decisionValues.value.energy.efficiency }
          ]
        }
      ]
    },
    {
      name: 'Goods and Services Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'G1 Worn Out Goods Production Capital', values: Array(gameSession.value.teams.length).fill(60) },
            { label: 'G2 New Goods Production Capital', values: Array(gameSession.value.teams.length).fill(240) },
            { label: 'G3 Total Producing Goods Production Capital', values: Array(gameSession.value.teams.length).fill(300) },
            { label: 'G4 Worn Out Social Services Capital', values: Array(gameSession.value.teams.length).fill(50) },
            { label: 'G5 New Social Services Capital', values: Array(gameSession.value.teams.length).fill(400) },
            { label: 'G6 Total Producing Social Services Capital', values: Array(gameSession.value.teams.length).fill(240) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'G7 Goods Production Capital Per Labourer', values: Array(gameSession.value.teams.length).fill(6) },
            { label: 'G8 Goods Production Multiplier from Goods Production Capital', values: Array(gameSession.value.teams.length).fill(5) },
            { label: 'G9 Social Services Capital Per Capital', values: Array(gameSession.value.teams.length).fill(2.25) },
            { label: 'G10 Labour Output Multiplier from Social Services', values: Array(gameSession.value.teams.length).fill(2.13) },
            { label: 'G11 Capacity Utilization', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'G12 Goods Production', values: Array(gameSession.value.teams.length).fill(3000) },
            { label: 'G13 Goods Export', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'G14 Goods Imports', values: Array(gameSession.value.teams.length).fill(500) },
            { label: 'G15 Expected Goods Production', values: Array(gameSession.value.teams.length).fill(3100) },
            { label: 'G16 Total Goods Available', values: Array(gameSession.value.teams.length).fill(3500) },
            { label: 'G17 Total Worn Out Capital', values: Array(gameSession.value.teams.length).fill(430) },
            { label: 'G18 Goods For Population', values: decisionValues.value.goods.population },
            { label: 'G19 Goods For Export', values: decisionValues.value.goods.export }
          ]
        }
      ]
    },
    {
      name: 'Food and Environment Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'F1 Worn Out Food Production Capital', values: Array(gameSession.value.teams.length).fill(160) },
            { label: 'F2 New Food Production Capital', values: Array(gameSession.value.teams.length).fill(640) },
            { label: 'F3 Total Producing Food Production Capital', values: Array(gameSession.value.teams.length).fill(800) },
            { label: 'F4 Worn Out Environmental Protection Capital', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'F5 New Environmental Protection Capital', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'F6 Total Producing Environmental Protection Capital', values: Array(gameSession.value.teams.length).fill(0) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'F7 Quality of the Environment', values: Array(gameSession.value.teams.length).fill(0.69) },
            { label: 'F8 Ratio of Food Production Capital to Ag. Land Area', values: Array(gameSession.value.teams.length).fill(0.8) },
            { label: 'F9 Expected Food Production', values: Array(gameSession.value.teams.length).fill(3450) },
            { label: 'F10 Capacity Utilization', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'F11 Food Production', values: Array(gameSession.value.teams.length).fill(3300) },
            { label: 'F12 Food Exports', values: Array(gameSession.value.teams.length).fill(1550) },
            { label: 'F13 Food Imports', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'F14 Goods For Import', values: decisionValues.value.goods.import },
            { label: 'F15 Goods For Capital', values: decisionValues.value.goods.capital }
          ]
        }
      ]
    },
    {
      name: 'Trade and Finance Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'TF1 Debt', values: Array(gameSession.value.teams.length).fill(0) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'TF2 Interest Rate', values: Array(gameSession.value.teams.length).fill(0.1) },
            { label: 'TF3 Price Multiplier for Imports', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'TF4 Interest Charges', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'TF5 Maximum Loan Available', values: Array(gameSession.value.teams.length).fill(1000) },
            { label: 'TF6 Price of Imported Energy', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'TF7 Price of Imported Goods', values: Array(gameSession.value.teams.length).fill(1.1) },
            { label: 'TF8 Price of Imported Food', values: Array(gameSession.value.teams.length).fill(1.1) },
            { label: 'TF9 Goods For Environment', values: decisionValues.value.goods.environment },
            { label: 'TF10 Goods For Social Services', values: decisionValues.value.goods.socialServices },
            { label: 'TF11 Goods For Efficiency', values: decisionValues.value.goods.efficiency },
            { label: 'TF12 Goods For Energy Production', values: decisionValues.value.goods.energyProduction },
            { label: 'TF13 New Food Production Capital', values: decisionValues.value.capital.foodProduction },
            { label: 'TF14 New Goods Production Capital', values: decisionValues.value.capital.goodsProduction },
            { label: 'TF15 New Social Services Capital', values: decisionValues.value.capital.socialServices },
            { label: 'TF16 New Environmental Protection Capital', values: decisionValues.value.capital.environmentalProtection },
            { label: 'TF17 New Energy Production Capital', values: decisionValues.value.capital.energyProduction },
            { label: 'TF18 New Energy Efficiency Capital', values: decisionValues.value.capital.energyEfficiency }
          ]
        }
      ]
    },
    {
      name: 'Summary',
      subcategories: [
        {
          label: 'Summary of all Stats',
          decisions: [
            { label: 'S1 Population (P1)', values: Array(gameSession.value.teams.length).fill(200) },
            { label: 'S2 Food Per Capita (P4)', values: Array(gameSession.value.teams.length).fill(2) },
            { label: 'S3 Goods Per Capita (P6)', values: Array(gameSession.value.teams.length).fill(2) },
            { label: 'S4 Population Growth Rate ((P8-P5)/1000)', values: Array(gameSession.value.teams.length).fill(0.023) },
            { label: 'S5 Debt (TF1)', values: Array(gameSession.value.teams.length).fill(0) },
            { label: 'S6 Quality of the Environment (F7)', values: Array(gameSession.value.teams.length).fill(0.69) },
            { label: 'S7 Energy Consumption Multiplier (E10)', values: Array(gameSession.value.teams.length).fill(1) },
            { label: 'S8 Average Food Capital Productivity (F9/F3)', values: Array(gameSession.value.teams.length).fill(4.3) },
            { label: 'S9 Average Goods Capital Productivity (G15/(G3+G6))', values: Array(gameSession.value.teams.length).fill(4.1) },
            { label: 'S10 Average Energy Capital Productivity (E17/E3)', values: Array(gameSession.value.teams.length).fill(17.5) },
            { label: 'S11 Total Food Available (P2)', values: Array(gameSession.value.teams.length).fill(3300) },
            { label: 'S12 Total Goods Available (P3)', values: Array(gameSession.value.teams.length).fill(3500) },
            { label: 'S13 Total Energy Available (E7)', values: Array(gameSession.value.teams.length).fill(15000) },
            { label: 'S14 Average Exports', values: Array(gameSession.value.teams.length).fill(1000) }
          ]
        }
      ]
    }
  ]

  // Update current round
  const hist = gameSession.value.history
  hist[hist.length - 1].categories = reportCategories

  // Calculate and create new round
  const nextRound = calculateNextRound(hist[hist.length - 1])
  hist.push({
    round: hist.at(-1).round + 1,
    categories: nextRound.categories
  })

  // Update storage
  const all = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const idx = all.findIndex(g => g.id === gameSession.value.id)
  if (idx !== -1) all[idx] = gameSession.value
  localStorage.setItem('savedGames', JSON.stringify(all))

  // Navigate to report page
  router.push(`/report/${gameSession.value.id}`)
}
</script>

<style>
:root {
  /* Modern color palette */
  --primary: #3498db;
  --primary-dark: #2980b9;
  --secondary: #2ecc71;
  --secondary-dark: #27ae60;
  --accent: #9b59b6;
  --danger: #e74c3c;
  --warning: #f39c12;
  --light: #f8f9fa;
  --dark: #2c3e50;
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
  --gray-400: #ced4da;
  --gray-500: #adb5bd;
  --gray-600: #6c757d;
  --gray-700: #495057;
  --gray-800: #343a40;

  /* Spacing system */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-xxl: 3rem;

  /* Typography */
  --font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;

  /* Borders and shadows */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --box-shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --box-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --box-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}

/* Global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font-family);
}

body {
  background-color: var(--gray-100);
  color: var(--dark);
  line-height: 1.5;
}
</style>

<style scoped>
.enter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
}

h1 {
  margin-bottom: var(--space-xl);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--dark);
}

h2 {
  margin: var(--space-lg) 0 var(--space-md);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--dark);
  border-left: 4px solid var(--primary);
  padding-left: var(--space-md);
}

.team-header {
  display: flex;
  padding: var(--space-md);
  background-color: var(--gray-200);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-md);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: var(--box-shadow-sm);
}

.decision-category {
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-sm);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  transition: transform var(--transition-normal);
}

.decision-category:hover {
  transform: translateY(-2px);
  box-shadow: var(--box-shadow-md);
}

.decision-row {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--gray-200);
  transition: background-color var(--transition-fast);
}

.decision-row:hover {
  background-color: var(--gray-100);
}

.decision-label {
  flex: 1;
  font-weight: 500;
  color: var(--gray-700);
  padding-right: var(--space-md);
}

.decision-values {
  display: flex;
  gap: var(--space-md);
}

.team-value {
  min-width: 80px;
  text-align: center;
  font-weight: bold;
  color: var(--primary);
}

.decision-input {
  width: 80px;
  padding: var(--space-xs) var(--space-sm);
  text-align: right;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.decision-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

.decision-input:disabled {
  background-color: var(--gray-200);
  cursor: not-allowed;
}

.save-bar {
  position: sticky;
  bottom: var(--space-md);
  text-align: center;
  margin: var(--space-xxl) 0;
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-md);
  z-index: 10;
}

/* Tooltip styling - improved for accessibility */
[title] {
  position: relative;
  cursor: help;
}

[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translateY(-4px);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--dark);
  color: white;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  max-width: 300px;
  z-index: 1000;
  box-shadow: var(--box-shadow-md);
  white-space: normal;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.decision-input.error {
  border-color: var(--danger);
  background-color: rgba(231, 76, 60, 0.05);
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: var(--font-size-sm);
  color: var(--danger);
  white-space: nowrap;
  margin-top: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .decision-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .decision-label {
    margin-bottom: var(--space-sm);
    padding-right: 0;
  }

  .decision-values {
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--space-md);
  }

  .team-header {
    position: relative;
  }
}
</style>