<template>
  <h3>VO : {{ totalVo }}</h3>
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
</template>

<script>
export default {
  props: ["totalVo", "txPres", "txFm", "txCe"],
};
</script>

<style></style>
