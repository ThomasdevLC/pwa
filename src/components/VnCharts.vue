<template>
  <div v-if="stat.nb_vn">
    <h3>VN : {{ stat.nb_vn }}</h3>

    <table
      class="charts-css bar show-labels data-spacing-5 labels-align-start show-data-axes"
    >
      <tbody>
        <tr>
          <th scope="row">Pré FM :</th>
          <td
            :style="
              '--size: calc(' +
              stat.tx_pres_fm_vn +
              '  / 100 ); --color: orange;'
            "
          >
            <span class="data"> {{ stat.tx_pres_fm_vn }} </span>
          </td>
        </tr>
        <tr>
          <th scope="row">Pén FM :</th>

          <td
            :style="
              '--size: calc(' + stat.tx_fm_vn + ' / 100 ); --color: orange;'
            "
          >
            <span class="data"> {{ stat.tx_fm_vn }} </span>
          </td>
        </tr>
        <tr>
          <th scope="row">Péné CE :</th>

          <td
            :style="
              '--size: calc(' + stat.tx_ce_vn + ' / 100 ); --color: orange;'
            "
          >
            <span class="data"> {{ stat.tx_ce_vn }} </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
