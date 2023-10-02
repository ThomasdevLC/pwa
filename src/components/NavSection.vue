<template>
  <div class="navigation">
    <nav>
      <router-link :to="{ name: 'home' }"><li>Vendeurs</li></router-link>
      <router-link :to="{ name: 'AppStores' }"><li>Concessions</li></router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navigation {
  margin-bottom: 30px;
}
nav {
  display: flex;
  justify-content: space-around;
  margin: auto;
  padding: 0;
  max-width: 500px;
}

a {
  background: var(--gray-second);
  color: var(--gray);
  text-align: center;
  border-radius: 6px;
  height: 45px;
  min-width: 155px;
  font-size: 20px;
  display: grid;
  place-items: center;
  text-decoration: none;
}

a:hover {
  cursor: pointer;
  background: var(--gray);
  color: white;
}

a.router-link-active {
  background: var(--gray);
  color: white;
}
</style>
