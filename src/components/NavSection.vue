<template>
  <div class="navigation">
    <nav>
      <ul>
        <li>Vendeurs</li>
        <li>Concessions</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: space-between;
  color: var(--gray);
  margin: auto;
  max-width: 350px;
}

li {
  text-align: center;
  border-radius: 6px;
  height: 45px;
  min-width: 170px;
  font-size: 20px;
  display: grid;
  place-items: center;
  background: none;
}

li:hover {
  cursor: pointer;
  color: white;
  background: var(--gray-second);
}
</style>
