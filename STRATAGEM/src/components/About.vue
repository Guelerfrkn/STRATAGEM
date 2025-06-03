<template>
  <div class="about">
    <Article>
      <h1>About Stratagem</h1>
      <p>
        Welcome to Stratagem, a strategic decision-making simulation game. 
        In this game, you'll manage resources, make critical decisions, and 
        work with your team to achieve success.
      </p>
      <Button @click="proceed">Start Game</Button>
    </Article>
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Article from './Article.vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const proceed = () => {
  router.push('/createTeams')
}
</script>

<style scoped>
@import '../styles/About.css';
</style>