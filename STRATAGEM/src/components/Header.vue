<template>
  <header class="header">
    <div class="logo">
      <RouterLink to="/createTeams">
        <img src="../assets/banner.gif" alt="STRATAGEM Logo" />
      </RouterLink>
    </div>
    <nav class="nav">
      <RouterLink to="/" class="nav-link">
        <i class="fas fa-home"></i> Home
      </RouterLink>
      <RouterLink to="/about" class="nav-link">
        <i class="fas fa-info-circle"></i> About
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.logo img {
  height: 40px;
  margin-right: 10px;
  cursor: pointer; /* Optional: Add a pointer cursor for better UX */
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
