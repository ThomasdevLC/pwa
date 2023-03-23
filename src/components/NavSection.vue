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

<style>
ul {
  display: flex;
  justify-content: space-between;
  color: var(--gray);
  margin: 30px 0 20px 0;
  padding: 0;
}

li {
  background: var(--gray-second);
  text-align: center;
  min-width: 200px;
  border-radius: 6px;
  height: 50px;
  display: grid;
  place-items: center;
}

li:hover {
  cursor: pointer;
  color: white;
}
</style>
