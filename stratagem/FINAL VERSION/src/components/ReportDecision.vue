<template>
  <div>
    <div class="decision-row">
      <span class="label" :title="getTooltip(label)">{{ label }}</span>
      <div class="values">
        <span 
          v-for="(value, index) in values" 
          :key="index" 
          class="value"
        >
          {{ value }}
        </span>
      </div>
    </div>
    <div v-if="isFirstDecision" class="team-header">
      <span class="spacer"></span>
      <div class="teams">
        <span 
          v-for="(team, index) in teams" 
          :key="index" 
          class="team-abbr"
        >
          {{ team.abbreviation }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  values: {
    type: Array,
    default: () => []
  },
  teams: {
    type: Array,
    default: () => []
  },
  isFirstDecision: {
    type: Boolean,
    default: false
  }
})

const getTooltip = (label) => {
  const tooltips = {
    'P1 Population': 'Current population size',
    'P2 Total Food Available': 'Total amount of food available for distribution',
    'P3 Total Goods Available': 'Total amount of goods available for distribution',
    'P4 Food Per Capita': 'Amount of food available per person',
    'P5 Goods Per Capita': 'Amount of goods available per person',
    'P6 Social Services Capital Per Capita': 'Amount of social services capital per person',
    'P7 Annual Births Per 1000': 'Number of births per 1000 people annually',
    'P9 Food For Population': 'Amount of food allocated to feed the population',
    'P10 Food For Export': 'Amount of food allocated for export',
    'P11 Food For Import': 'Amount of food to be imported',
    'P12 Food For Capital': 'Amount of food allocated for capital maintenance',
    'P13 Food For Environment': 'Amount of food allocated for environmental protection',
    'E1 Worn Out Energy Production Capital': 'Amount of worn out energy production facilities',
    'E2 New Energy Production Capital': 'Amount of new energy production facilities',
    'E3 Total Producing Energy Production Capital': 'Total amount of energy production facilities',
    'E4 Worn Out Energy Efficiency Capital': 'Amount of worn out energy efficiency facilities',
    'E5 New Energy Efficiency Capital': 'Amount of new energy efficiency facilities',
    'E6 Total Producing Energy Efficiency Capital': 'Total amount of energy efficiency facilities',
    'E7 Total Energy Available': 'Total amount of energy available for distribution',
    'E8 Energy Required Per Unit of Goods for Population': 'Energy needed per unit of goods for population',
    'E9 Energy for Population': 'Energy allocated for population needs',
    'E10 Energy Consumption Multiplier': 'Multiplier affecting energy consumption',
    'E11 Energy Required Per Unit of Food Production Capital': 'Energy needed per unit of food production',
    'E12 Energy Required for Full Use of Food Production Capital': 'Energy needed for full food production',
    'E13 Energy Required Per Unit of Goods Production Capital': 'Energy needed per unit of goods production',
    'E14 Energy Required for Full Use of Goods Production Capital': 'Energy needed for full goods production',
    'E15 Total Energy Required for Production': 'Total energy needed for all production',
    'E16 Average Energy Per Unit Energy Production Capital': 'Average energy output per production unit',
    'E17 Energy Production This Cycle': 'Energy produced in current cycle',
    'E18 Energy Exports': 'Energy allocated for export',
    'E19 Energy Imports': 'Energy to be imported',
    'E20 Energy For Population': 'Energy allocated for population needs',
    'E21 Energy For Food Production': 'Energy allocated for food production',
    'E22 Energy For Goods Production': 'Energy allocated for goods production',
    'E23 Energy For Export': 'Energy allocated for export',
    'E24 Energy For Import': 'Energy to be imported',
    'E25 Energy For Capital': 'Energy allocated for capital maintenance',
    'E26 Energy For Environment': 'Energy allocated for environmental protection',
    'E27 Energy For Efficiency': 'Energy allocated for efficiency improvements',
    'G1 Worn Out Goods Production Capital': 'Amount of worn out goods production facilities',
    'G2 New Goods Production Capital': 'Amount of new goods production facilities',
    'G3 Total Producing Goods Production Capital': 'Total amount of goods production facilities',
    'G4 Worn Out Social Services Capital': 'Amount of worn out social services facilities',
    'G5 New Social Services Capital': 'Amount of new social services facilities',
    'G6 Total Producing Social Services Capital': 'Total amount of social services facilities',
    'G7 Goods Production Capital Per Labourer': 'Goods production capital per worker',
    'G8 Goods Production Multiplier from Goods Production Capital': 'Multiplier for goods production',
    'G9 Social Services Capital Per Capital': 'Social services capital per person',
    'G10 Labour Output Multiplier from Social Services': 'Multiplier for labor output from social services',
    'G11 Capacity Utilization': 'Current utilization of production capacity',
    'G12 Goods Production': 'Current goods production level',
    'G13 Goods Export': 'Goods allocated for export',
    'G14 Goods Imports': 'Goods to be imported',
    'G15 Expected Goods Production': 'Expected level of goods production',
    'G16 Total Goods Available': 'Total amount of goods available',
    'G17 Total Worn Out Capital': 'Total amount of worn out capital',
    'G18 Goods For Population': 'Goods allocated for population needs',
    'G19 Goods For Export': 'Goods allocated for export',
    'F1 Worn Out Food Production Capital': 'Amount of worn out food production facilities',
    'F2 New Food Production Capital': 'Amount of new food production facilities',
    'F3 Total Producing Food Production Capital': 'Total amount of food production facilities',
    'F4 Worn Out Environmental Protection Capital': 'Amount of worn out environmental protection facilities',
    'F5 New Environmental Protection Capital': 'Amount of new environmental protection facilities',
    'F6 Total Producing Environmental Protection Capital': 'Total amount of environmental protection facilities',
    'F7 Quality of the Environment': 'Current environmental quality index',
    'F8 Ratio of Food Production Capital to Ag. Land Area': 'Food production capital per land area',
    'F9 Expected Food Production': 'Expected level of food production',
    'F10 Capacity Utilization': 'Current utilization of food production capacity',
    'F11 Food Production': 'Current food production level',
    'F12 Food Exports': 'Food allocated for export',
    'F13 Food Imports': 'Food to be imported',
    'F14 Goods For Import': 'Goods to be imported',
    'F15 Goods For Capital': 'Goods allocated for capital maintenance',
    'TF1 Debt': 'Current level of debt',
    'TF2 Interest Rate': 'Current interest rate',
    'TF3 Price Multiplier for Imports': 'Multiplier affecting import prices',
    'TF4 Interest Charges': 'Current interest charges',
    'TF5 Maximum Loan Available': 'Maximum amount available for loans',
    'TF6 Price of Imported Energy': 'Price of imported energy',
    'TF7 Price of Imported Goods': 'Price of imported goods',
    'TF8 Price of Imported Food': 'Price of imported food',
    'TF9 Goods For Environment': 'Goods allocated for environmental protection',
    'TF10 Goods For Social Services': 'Goods allocated for social services',
    'TF11 Goods For Efficiency': 'Goods allocated for efficiency improvements',
    'TF12 Goods For Energy Production': 'Goods allocated for energy production',
    'TF13 New Food Production Capital': 'Investment in new food production facilities',
    'TF14 New Goods Production Capital': 'Investment in new goods production facilities',
    'TF15 New Social Services Capital': 'Investment in new social services facilities',
    'TF16 New Environmental Protection Capital': 'Investment in new environmental protection facilities',
    'TF17 New Energy Production Capital': 'Investment in new energy production facilities',
    'TF18 New Energy Efficiency Capital': 'Investment in new energy efficiency facilities',
    'S1 Population (P1)': 'Current population size',
    'S2 Food Per Capita (P4)': 'Amount of food available per person',
    'S3 Goods Per Capita (P6)': 'Amount of goods available per person',
    'S4 Population Growth Rate ((P8-P5)/1000)': 'Annual population growth rate',
    'S5 Debt (TF1)': 'Current level of debt',
    'S6 Quality of the Environment (F7)': 'Current environmental quality index',
    'S7 Energy Consumption Multiplier (E10)': 'Multiplier affecting energy consumption',
    'S8 Average Food Capital Productivity (F9/F3)': 'Average food production per capital unit',
    'S9 Average Goods Capital Productivity (G15/(G3+G6))': 'Average goods production per capital unit',
    'S10 Average Energy Capital Productivity (E17/E3)': 'Average energy production per capital unit',
    'S11 Total Food Available (P2)': 'Total amount of food available for distribution',
    'S12 Total Goods Available (P3)': 'Total amount of goods available for distribution',
    'S13 Total Energy Available (E7)': 'Total amount of energy available for distribution',
    'S14 Average Exports': 'Average amount of exports across all resources'
  }
  return tooltips[label] || 'No description available'
}
</script>

<style scoped>
.decision-row {
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid #ccc;
}

.label {
  flex: 1;
}

.values {
  display: flex;
  gap: 20px;
}

.value {
  min-width: 80px;
  text-align: right;
}

.team-header {
  display: flex;
  padding: 4px 8px;
  background-color: #f5f5f5;
}

.spacer {
  flex: 1;
}

.teams {
  display: flex;
  gap: 20px;
}

.team-abbr {
  min-width: 80px;
  text-align: right;
  font-weight: bold;
}

/* Add tooltip styling */
[title] {
  position: relative;
  cursor: help;
}

[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  margin-bottom: 5px;
}
</style>  