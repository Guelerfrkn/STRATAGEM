<template>
  <v-footer class="text-center py-4 flex-grow-0" color="indigo-lighten-1">
    <div class="footer-max-width d-flex justify-space-between">
      <p class="copyright">
        &copy; {{ currentYear }} Stratagem
      </p>
      <nav class="footer-nav">
        <RouterLink to="/" class="footer-link">
          <i class="fas fa-home"></i> Home
        </RouterLink>
        <RouterLink v-if="showInstructions" to="./About" class="footer-link">
          About
        </RouterLink>
        <RouterLink to="/impressum" class="footer-link">
          Legal Notice
        </RouterLink>
      </nav>
    </div>
  </v-footer>
  <!-- <footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        &copy; {{ currentYear }} Stratagem
      </p>
      <nav class="footer-nav">
        <RouterLink v-if="showInstructions" to="./About" class="footer-link">
          About
        </RouterLink>
        <RouterLink to="/impressum" class="footer-link">
          Legal Notice
        </RouterLink>
      </nav>
    </div>
  </footer> -->
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showInstructions: true,
    };
  },
};
</script>

<style scoped>
@import '../styles/Footer.css';
</style>
