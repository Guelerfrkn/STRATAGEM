<template>
  <v-app>
    <Header />
    <v-main>
      <div class="main-container">
        <router-view />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
html {
  font-family: 'Plus Jakarta Sans' !important;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 20px;
}

.main-container {
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
}
</style>
