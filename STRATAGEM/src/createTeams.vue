<template>
  <div class="create-teams">
    <h1>Create Teams</h1>

    <form @submit.prevent="startGame" class="teams-form">
      <!-- Spielname -->
      <div class="form-group">
        <label for="sessionName">Session Name:</label>
        <TextInput
          id="sessionName"
          v-model="sessionName"
          placeholder="Enter a name for the session"
        />
      </div>

      <!-- Team-Anzahl -->
      <div class="form-group">
        <label for="numTeams">Number of teams to create:</label>
        <DropdownInput
          id="numTeams"
          v-model="numTeams"
          :options="teamOptions"
          @update:modelValue="handleTeamCountChange"
        />
      </div>

      <!-- Team-Details -->
      <div class="teams-container">
        <div
          v-for="(team, index) in teams"
          :key="index"
          class="team-group"
        >
          <h3>Team {{ index + 1 }}</h3>

          <div class="form-group">
            <label :for="'teamName' + (index + 1)">Team Name:</label>
            <TextInput
              :id="'teamName' + (index + 1)"
              :inputId="'teamName' + (index + 1)"
              v-model="team.name"
              placeholder="Enter team name"
            />
          </div>

          <div class="form-group">
            <label :for="'teamAbbr' + (index + 1)">Team Abbreviation:</label>
            <TextInput
              :id="'teamAbbr' + (index + 1)"
              :inputId="'teamAbbr' + (index + 1)"
              v-model="team.abbreviation"
              placeholder="3 capital letters (e.g. ABC)"
              :maxlength="3"
              @input="validateAbbreviation($event, index)"
            />
          </div>
        </div>
      </div>

      <Button type="submit" class="submit-button">
        Start Game
      </Button>
    </form>
  </div>
</template>

<script setup>
/* imports ----------------------------------------------------------- */
import { ref, watch }         from 'vue'
import { useRouter }          from 'vue-router'
import TextInput              from './components/TextInput.vue'
import DropdownInput          from './components/DropdownInput.vue'
import Button                 from './components/Button.vue'

/* reactive state ---------------------------------------------------- */
const router      = useRouter()
const sessionName = ref('')
const numTeams    = ref(2)
const teams       = ref([
  { name: '', abbreviation: '' },
  { name: '', abbreviation: '' }
])

/* Optionen für Dropdown -------- */
const teamOptions = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' }
]

/* Anzahl-Änderung anpassen ------- */
watch(numTeams, (newNum) => {
  while (teams.value.length < newNum) teams.value.push({ name: '', abbreviation: '' })
  while (teams.value.length > newNum) teams.value.pop()
})

const handleTeamCountChange = (v) => (numTeams.value = parseInt(v, 10))

/* Kürzel validieren -------------- */
const validateAbbreviation = (e, idx) => {
  teams.value[idx].abbreviation =
    e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
}

/* Start-Button ------------------------------------------------------ */
const startGame = () => {
  /* Start-Statistiken erzeugen */
  const baseCategories = buildStartCategories(teams.value.length)

  const gameSession = {
    id:           Date.now().toString(),
    sessionName:  sessionName.value || 'New Game',
    teams:        JSON.parse(JSON.stringify(teams.value)),
    currentRound: 1,
    history: [
      { round: 1, categories: JSON.parse(JSON.stringify(baseCategories)) }
    ],
    pendingDecisions: JSON.parse(JSON.stringify(baseCategories)),
    lastPlayed: new Date().toISOString()
  }

  /* speichern */
  const saved = JSON.parse(localStorage.getItem('savedGames') || '[]')
  saved.push(gameSession)
  localStorage.setItem('savedGames', JSON.stringify(saved))
  localStorage.setItem('teams', JSON.stringify(teams.value))

  router.push(`/report/${gameSession.id}`)
}

/* ---------- Hilfsfunktion: Basis-Kategorien ----------------------- */
function buildStartCategories(n) {
  const arr = (v) => Array(n).fill(v)

  return [
    /* Population --------------------------------------------------- */
    {
      name: 'Population Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'P1 Population',           values: arr(200)  },
            { label: 'P2 Total Food Available', values: arr(3300) },
            { label: 'P3 Total Goods Available',values: arr(3500) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'P4 Food Per Capita',                    values: arr(2)    },
            { label: 'P5 Goods Per Capita',                   values: arr(2)    },
            { label: 'P6 Social Services Capital Per Capita', values: arr(2.25) },
            { label: 'P7 Annual Births Per 1000',             values: arr(41)   }
          ]
        }
      ]
    },

    /* Energy ------------------------------------------------------- */
    {
      name: 'Energy Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'E1 Worn Out Energy Production Capital',        values: arr(160)   },
            { label: 'E2 New Energy Production Capital',             values: arr(640)   },
            { label: 'E3 Total Producing Energy Production Capital', values: arr(800)   },
            { label: 'E4 Worn Out Energy Efficiency Capital',        values: arr(0)     },
            { label: 'E5 New Energy Efficiency Capital',             values: arr(0)     },
            { label: 'E6 Total Producing Energy Efficiency Capital', values: arr(0)     },
            { label: 'E7 Total Energy Available',                    values: arr(15000) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'E8 Energy Required Per Unit of Goods for Population', values: arr(0.2)  },
            { label: 'E9 Energy for Population',                            values: arr(400)  },
            { label: 'E10 Energy Consumption Multiplier',                   values: arr(1)    },
            { label: 'E11 Energy Required Per Unit of Food Production Capital', values: arr(12.5) },
            { label: 'E12 Energy Required for Full Use of Food Production Capital', values: arr(10000) },
            { label: 'E13 Energy Required Per Unit of Goods Production Capital',   values: arr(20) },
            { label: 'E14 Energy Required for Full Use of Goods Production Capital', values: arr(6000) },
            { label: 'E15 Total Energy Required for Production',            values: arr(16000) },
            { label: 'E16 Average Energy Per Unit Energy Production Capital', values: arr(17.5) },
            { label: 'E17 Energy Production This Cycle',                    values: arr(14000) },
            { label: 'E18 Energy Exports',                                  values: arr(0)    },
            { label: 'E19 Energy Imports',                                  values: arr(1000) }
          ]
        }
      ]
    },

    /* Goods & Services -------------------------------------------- */
    {
      name: 'Goods and Services Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'G1 Worn Out Goods Production Capital',          values: arr(60)  },
            { label: 'G2 New Goods Production Capital',               values: arr(240) },
            { label: 'G3 Total Producing Goods Production Capital',   values: arr(300) },
            { label: 'G4 Worn Out Social Services Capital',           values: arr(50)  },
            { label: 'G5 New Social Services Capital',                values: arr(400) },
            { label: 'G6 Total Producing Social Services Capital',    values: arr(240) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'G7 Goods Production Capital Per Labourer',            values: arr(6)   },
            { label: 'G8 Goods Production Multiplier from Goods Production Capital', values: arr(5) },
            { label: 'G9 Social Services Capital Per Capital',              values: arr(2.25)},
            { label: 'G10 Labour Output Multiplier from Social Services',   values: arr(2.13)},
            { label: 'G11 Capacity Utilization',                            values: arr(1)   },
            { label: 'G12 Goods Production',                                values: arr(3000)},
            { label: 'G13 Goods Export',                                    values: arr(0)   },
            { label: 'G14 Goods Imports',                                   values: arr(500) },
            { label: 'G15 Expected Goods Production',                       values: arr(3100)},
            { label: 'G16 Total Goods Available',                           values: arr(3500)},
            { label: 'G17 Total Worn Out Capital',                          values: arr(430) }
          ]
        }
      ]
    },

    /* Food & Environment ------------------------------------------ */
    {
      name: 'Food and Environment Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'F1 Worn Out Food Production Capital',                  values: arr(160) },
            { label: 'F2 New Food Production Capital',                       values: arr(640) },
            { label: 'F3 Total Producing Food Production Capital',           values: arr(800) },
            { label: 'F4 Worn Out Environmental Protection Capital',         values: arr(0)   },
            { label: 'F5 New Environmental Protection Capital',              values: arr(0)   },
            { label: 'F6 Total Producing Environmental Protection Capital',  values: arr(0)   }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'F7 Quality of the Environment',                         values: arr(0.69) },
            { label: 'F8 Ratio of Food Production Capital to Ag. Land Area', values: arr(0.8)  },
            { label: 'F9 Expected Food Production',                           values: arr(3450) },
            { label: 'F10 Capacity Utilization',                              values: arr(1)    },
            { label: 'F11 Food Production',                                   values: arr(3300) },
            { label: 'F12 Food Exports',                                      values: arr(1550) },
            { label: 'F13 Food Imports',                                      values: arr(0)    }
          ]
        }
      ]
    },

    /* Trade & Finance --------------------------------------------- */
    {
      name: 'Trade and Finance Minister',
      subcategories: [
        {
          label: 'Current Situation',
          decisions: [
            { label: 'TF1 Debt', values: arr(0) }
          ]
        },
        {
          label: 'Useful Information',
          decisions: [
            { label: 'TF2 Interest Rate',            values: arr(0.1) },
            { label: 'TF3 Price Multiplier for Imports', values: arr(1)   },
            { label: 'TF4 Interest Charges',         values: arr(0)   },
            { label: 'TF5 Maximum Loan Available',   values: arr(1000)},
            { label: 'TF6 Price of Imported Energy', values: arr(1)   },
            { label: 'TF7 Price of Imported Goods',  values: arr(1.1) },
            { label: 'TF8 Price of Imported Food',   values: arr(1.1) }
          ]
        }
      ]
    },

    /* Summary ------------------------------------------------------ */
    {
      name: 'Summary',
      subcategories: [
        {
          label: 'Summary of all Stats',
          decisions: [
            { label: 'S1 Population (P1)',                           values: arr(200)   },
            { label: 'S2 Food Per Capita (P4)',                      values: arr(2)     },
            { label: 'S3 Goods Per Capita (P6)',                     values: arr(2)     },
            { label: 'S4 Population Growth Rate ((P8-P5)/1000)',     values: arr(0.023) },
            { label: 'S5 Debt (TF1)',                                values: arr(0)     },
            { label: 'S6 Quality of the Environment (F7)',           values: arr(0.69)  },
            { label: 'S7 Energy Consumption Multiplier (E10)',       values: arr(1)     },
            { label: 'S8 Average Food Capital Productivity (F9/F3)', values: arr(4.3)   },
            { label: 'S9 Average Goods Capital Productivity (G15/(G3+G6))', values: arr(4.1) },
            { label: 'S10 Average Energy Capital Productivity (E17/E3)',    values: arr(17.5)},
            { label: 'S11 Total Food Available (P2)',                values: arr(3300)  },
            { label: 'S12 Total Goods Available (P3)',               values: arr(3500)  },
            { label: 'S13 Total Energy Available (E7)',              values: arr(15000) },
            { label: 'S14 Average Exports',                          values: arr(1000)  }
          ]
        }
      ]
    }
  ]
}
</script>

<style scoped>
/* unverändert – dein bisheriger Style-Block */
.create-teams { max-width: 800px; margin: 0 auto; padding: 2rem; }
h1            { text-align: center; margin-bottom: 2rem; color: #333 }
.teams-form   { background: #fff; padding: 2rem; border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,.1) }
.form-group   { margin-bottom: 1.5rem }
label         { display:block; margin-bottom:.5rem; font-weight:600; color:#333 }
.team-group   { background:#f8f9fa; padding:1.5rem; border-radius:6px;
                margin-bottom:1.5rem; border:1px solid #e9ecef }
.team-group h3{ margin:0 0 1rem 0; color:#495057; font-size:1.1rem }
.teams-container{ margin:2rem 0 }
.submit-button { width:100%; padding:.75rem; font-size:1.1rem; margin-top:1rem }
@media (min-width:768px){
  .form-group{ display:grid; grid-template-columns:150px 1fr; gap:1rem; align-items:center }
  label{ margin-bottom:0 }
}
</style>
