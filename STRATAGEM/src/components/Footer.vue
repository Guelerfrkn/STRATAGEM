<template>
  <footer class="footer">
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
  </footer>
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
