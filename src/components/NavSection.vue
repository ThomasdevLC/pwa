<template>
  <div class="navigation">
    <nav>
      <router-link :to="{ name: 'home' }"><li>Vendeurs</li></router-link>
      <router-link :to="{ name: 'home2' }"><li>Concessions</li></router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 0;
  max-width: 350px;
}

a {
  /* color: var(--gray); */
  background: var(--gray-second);
  color: var(--gray);
  text-align: center;
  border-radius: 6px;
  height: 45px;
  min-width: 170px;
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
