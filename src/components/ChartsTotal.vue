<template>
  <h3>TOTAL : {{ total }}</h3>
  <div class="radial">
    <div
      class="pie animate no-round"
      :style="{ '--p': percentage, '--c': 'orange' }"
    >
      {{ percentage }}%
    </div>
  </div>
</template>

<script>
export default {
  props: ["total", "percentage"],
};
</script>

<style>
.pie {
  --p: 20;
  --b: 22px;
  --c: #ff8800;
  --w: 150px;

  width: var(--w);
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  margin: 5px;
  place-content: center;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
}
.pie:before,
.pie:after {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.pie:before {
  inset: 0;
  background: radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b)
      var(--b) no-repeat,
    conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--b)),
    #000 calc(100% - var(--b))
  );
  mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--b)),
    #000 calc(100% - var(--b))
  );
}
.pie:after {
  inset: calc(50% - var(--b) / 2);
  background: var(--c);
  transform: rotate(calc(var(--p) * 3.6deg))
    translateY(calc(50% - var(--w) / 2));
}
.animate {
  animation: p 1s 0.5s both;
}
.no-round:before {
  background-size: 0 0, auto;
  border: 3px solid rgb(211, 198, 198);
}
.no-round:after {
  content: none;
}
@keyframes p {
  from {
    --p: 0;
  }
}
</style>
