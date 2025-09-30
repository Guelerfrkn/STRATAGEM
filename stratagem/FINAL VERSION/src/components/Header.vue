<template>
  <div class="header-main bg-indigo-lighten-1">
    <header class="header">
      <div class="logo">
        <RouterLink to="/">
          <img src="../assets/banner.gif" alt="STRATAGEM Logo" />
        </RouterLink>
      </div>
      <nav class="nav">
        <v-btn variant="text" to="/"><i class="fas fa-home"></i> Home</v-btn>
        <v-btn variant="text" to="/about"><i class="fas fa-info-circle"></i> About</v-btn>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
@import '../styles/Header.css';
</style>
