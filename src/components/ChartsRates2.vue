<template>
  <h3>{{ title }} : {{ total }}</h3>
  <table
    id="my-chart"
    class="charts-css bar show-labels labels-align-start data-spacing-5 labels-align-start show-data-axes"
  >
    <tbody>
      <tr>
        <th class="title" scope="row">Prés FM %</th>
        <td :style="'--size: calc(' + txPres + '  / 100 ); --color: orange; '">
          <span class="data"> {{ txPres }} </span>
        </td>
      </tr>
      <tr>
        <th scope="row">Péné FM %</th>

        <td :style="'--size: calc(' + txFm + ' / 100 ); --color: orange;'">
          <span class="data"> {{ txFm }} </span>
        </td>
      </tr>
      <tr>
        <th class="title" scope="row">Péné CE %</th>

        <td :style="';--size: calc(' + txCe + ' / 100 ); --color: orange ; '">
          <span class="data"> {{ txCe }} </span>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="center">
    <h3>{{ title }} : {{ total }}</h3>
    <div class="rateBox">
      <p>Prés FM :</p>
      <p>{{ txPres }}</p>
      <div class="rate">
        <div class="rate-level" :style="{ width: txPres }"></div>
      </div>
    </div>
    <div class="rateBox">
      <p>Pén FM :</p>
      <p>{{ txFm }}</p>
      <div class="rate">
        <div class="rate-level" :style="{ width: txFm }"></div>
      </div>
    </div>
    <div class="rateBox">
      <p>Pén CE :</p>
      <p>{{ txCe }}</p>
      <div class="rate">
        <div class="rate-level" :style="{ width: txCe }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "total", "txPres", "txFm", "txCe"],
};
</script>

<style>
#my-chart.bar {
  --labels-size: 100px;
}

.data {
  padding: 0px 5px;
}

.center {
  width: 100%;
  top: 50%;
  left: 50%;
  padding: 20px;
}

h3 {
  margin: 0;
  padding: 0;
  color: #333;
}

.rateBox {
  width: 100%;
  margin: 20px 0;
}
.rateBox p {
  color: #333;
  margin: 0 0 10px;
  font-weight: 900;
}
.rateBox p:nth-child(2) {
  float: right;
  position: relative;
  top: -35px;
}

.rate {
  background: #5f5e5e;
  padding: 3px;
  border: 1px solid #ff8800;
}

.rate-level {
  background: #ff8800;
  height: 12px;
  width: 50%;
}
</style>
