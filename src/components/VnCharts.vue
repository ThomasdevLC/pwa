<template>
  <h3>VN : {{ totalVn }}</h3>

  <table
    class="charts-css bar show-labels data-spacing-5 labels-align-start show-data-axes"
  >
    <tbody>
      <tr>
        <th scope="row">Pré FM :</th>
        <td :style="'--size: calc(' + txPres + '  / 100 ); --color: orange;'">
          <span class="data"> {{ txPres }} </span>
        </td>
      </tr>
      <tr>
        <th scope="row">Pén FM :</th>

        <td :style="'--size: calc(' + txFm + ' / 100 ); --color: orange;'">
          <span class="data"> {{ txFm }} </span>
        </td>
      </tr>
      <tr>
        <th scope="row">Péné CE :</th>

        <td :style="'--size: calc(' + txCe + ' / 100 ); --color: orange;'">
          <span class="data"> {{ txCe }} </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["totalVn", "txPres", "txFm", "txCe"],
};
</script>

<style></style>
