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
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-top: 1px solid #ddd; /* optional: für leichte Abgrenzung */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.footer-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.footer-link:hover {
  text-decoration: underline;
}

.copyright {
  font-size: 0.9rem;
}
</style>
