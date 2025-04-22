<template>
  <div>
    <h1>Create Teams</h1>
    <form @submit.prevent="startGame">
      <div>
        <label for="sessionName">Session Name:</label>
        <TextInput
          id="sessionName"
          v-model="sessionName"
          placeholder="Gib einen Namen für die Session ein"
        />
      </div>
      <div>
        <label for="numTeams">Number of teams to create:</label>
        <DropdownInput
          id="numTeams"
          v-model="numTeams"
          :options="teamOptions"
          @update:modelValue="handleTeamCountChange"
        />
      </div>

      <div v-for="(team, index) in teams" :key="index">
        <label :for="'teamName' + (index + 1)">Team {{ index + 1 }} Name:</label>
        <TextInput
          :id="'teamName' + (index + 1)"
          v-model="team.name"
          placeholder="Gib einen Teamnamen ein"
        />
      </div>

      <Button type="submit">Start Game</Button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TextInput from './components/TextInput.vue';
import DropdownInput from './components/DropdownInput.vue';
import Button from './components/Button.vue';
import { useRouter } from 'vue-router';

const sessionName = ref('');
const numTeams = ref(1);
const teams = ref([{ name: '' }]);
const teamOptions = ref([
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
]);

const router = useRouter();

watch(numTeams, (newNum) => {
  while (teams.value.length < newNum) {
    teams.value.push({ name: '' });
  }
  while (teams.value.length > newNum) {
    teams.value.pop();
  }
});

const handleTeamCountChange = (newCount) => {
  numTeams.value = parseInt(newCount, 10);
};

const startGame = () => {
  console.log('Session Name:', sessionName.value);
  console.log('Teams:', teams.value);
  router.push('/game');
};
</script>

<style scoped>
div {
  margin-bottom: 1.5em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

input[type="text"],
select {
  width: 100%;
  padding: 0.7em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  margin-top: 1em;
}

@media (min-width: 768px) {
  label {
    display: inline-block;
    width: 150px;
    margin-right: 1em;
  }
  input[type="text"],
  select {
    width: auto;
    flex-grow: 1;
  }
  form > div {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }
}
</style>