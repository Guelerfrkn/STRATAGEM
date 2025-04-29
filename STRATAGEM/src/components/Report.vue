<template>
    <div>
      <Header />
  
      <main>
        <h1>Stratagem Report</h1>
        <div>
          <ReportCategory
            v-for="(category, index) in categories"
            :key="index"
            :name="category.name"
            :subcategories="category.subcategories"
          />
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  //import Header from './Header.vue'
  //import Footer from './Footer.vue'
  import ReportCategory from './ReportCategory.vue'
  //import ReportFilter from './ReportFilter.vue'
  
  const categories = ref([
    {
      name: "Population Minister",
      subcategories: [
        {
          label: "Current Situation",
          decisions: [
            { label: "P1 Population", value: 200 },
            { label: "P2 Total Food Available", value: 3300 },
            { label: "P3 Total Goods Available", value: 3500 }
          ]
        },
        {
          label: "Useful Information",
          decisions: [
            { label: "P4 Food Per Capita", value: 2 },
            { label: "P5 Goods Per Capita", value: 2 },
            { label: "P6 Social Services Capital Per Capita", value: 2.25 },
            { label: "P7 Annual Births Per 1000", value: 41 }
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
            { label: "E1 Worn Out Energy Production Capital", value: 160 },
            { label: "E2 New Energy Production Capital", value: 640 },
            { label: "E3 Total Producing Energy Production Capital", value: 800 },
            { label: "E4 Worn Out Energy Efficiency Capital", value: 0 },
            { label: "E5 New Energy Efficiency Capital", value: 0 },
            { label: "E6 Total Producing Energy Efficiency Capital", value: 0 },
            { label: "E7 Total Energy Available", value: 15000 },
          ]
        },
        {
          label: "Useful Information",
          decisions: [
            { label: "E8 Energy Required Per Unit of Goods for Population", value: 0.2 },
            { label: "E9 Energy for Population", value: 400 },
            { label: "E10 Energy Consumption Multiplier", value: 1 },
            { label: "E11 Energy Required Per Unit of Food Production Capital", value: 12.5 },
            { label: "E12 Energy Required for Full Use of Food Production Capital", value: 10000 },
            { label: "E13 Energy Required Per Unit of Goods Production Capital", value: 20 },
            { label: "E14 Energy Required for Full Use of Goods Production Capital", value: 6000 },
            { label: "E15 Total Energy Required for Production", value: 16000 },
            { label: "E16 Average Energy Per Unit Energy Production Capital", value: 17.5 },
            { label: "E17 Energy Production This Cycle", value: 14000 },
            { label: "E18 Energy Exports", value: 0 },
            { label: "E19 Energy Imports", value: 1000 }
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
            { label: "G1 Worn Out Goods Production Capital", value: 60 },
            { label: "G2 New Goods Production Capital", value: 240 },
            { label: "G3 Total Producing Goods Production Capital", value: 300 },
            { label: "G4 Worn Out Social Services Capital", value: 50 },
            { label: "G5 New Social Services Capital", value: 400 },
            { label: "G6 Total Producing Social Services Capital", value: 240 },



          ]
        },
        {
          label: "Useful Information",
          decisions: [
            { label: "G7 Goods Production Capital Per Labourer", value: 6 },
            { label: "G8 Goods Production Multiplier from Goods Production Capital", value: 5 },
            { label: "G9 Social Services Capital Per Capital", value: 2.25 },
            { label: "G10 Labout Output Multiplier from Social Services", value: 2.13 },
            { label: "G11 Capacity Utilization", value: 1 },
            { label: "G12 Good Production", value: 3000 },
            { label: "G13 Goods Export", value: 0 },
            { label: "G14 Goods Imports", value: 500 },
            { label: "G15 Expected Goods Production", value: 3100 },
            { label: "G16 Total Goods Available", value: 3500 },
            { label: "G17 Total Worn Out Capital", value: 430 }
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
            { label: "F1 Worn Out Food Production Capital", value: 160 },
            { label: "F2 New Food Production Capital", value: 640 },
            { label: "F3 Total Producing Food Production Capital", value: 800 },
            { label: "F4 Worn Out Environmental Protection Capital", value: 0 },
            { label: "F5 New Environmental Protection Capital", value: 0 },
            { label: "F6 Total Producing Environmental Protection Capital", value: 0 },
          ]
        },
        {
          label: "Useful Information",
          decisions: [
            { label: "F7 Quality of the Environment", value: 0.69 },
            { label: "F8 Ratio of Food Production Capital to Ag. Land Area", value: 0.8 },
            { label: "F9 Expected Food Production", value: 3450 },
            { label: "F10 Capacity Utilization", value: 1 },
            { label: "F11 Food Production", value: 3300 },
            { label: "F12 Food Exports", value: 1550 },
            { label: "F13 Food Imports", value: 0 },
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
            { label: "TFI Debt", value: 0 }
          ]
        },
        {
          label: "Useful Information",
          decisions: [
            { label: "TF2 Interest Rate", value: 0.1 },
            { label: "TF3 Price Multiplier for Imports", value: 1 },
            { label: "TF4 Interest Charges", value: 0 },
            { label: "TF5 Maximum Loan Available", value: 1000 },
            { label: "TF6 Price of Imported Energy", value: 1 },
            { label: "TF7 Price of Imported Goods", value: 1.1 },
            { label: "TF8 Price of Imported Food", value: 1.1 },
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
            { label: "S1 Population (P1)", value: 200 },
            { label: "S2 Food Per Capita (P4)", value: 2 },
            { label: "S3 Goods Per Capita (P6)", value: 2 },
            { label: "S4 Population Growth Rate ((P8-P5)/1000)", value: 0.023 },
            { label: "S5 Debt (TF1)", value: 0 },
            { label: "S6 Quality of the Environment (F7)", value: 0.69 },
            { label: "S7 Energy Consumption Multiplier (E10)", value: 1 },
            { label: "S8 Average Food Capital Productivity (F9/F3)", value: 4.3 },
            { label: "S9 Average Goods Capital Productivity (G15/(G3+G6))", value: 4.1 },
            { label: "S10 Average Energy Capital Productivity (E17/E3)", value: 17.5 },
            { label: "S11 Total Food Available (P2)", value: 3300 },
            { label: "S12 Total Goods Available (P3)", value: 3500 },
            { label: "S13 Total Energy Available (E7)", value: 15000 },
            { label: "S14 Average Exports", value: 1000 }
          ]
        }
      ]
    }
  ])
  </script>
  