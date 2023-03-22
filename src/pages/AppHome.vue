<template>
  <div class="home">
    <div v-if="data">
      <div class="home__user">
        <div v-for="image in images" :key="image">
          <img class="home__user__image" :src="image" />
        </div>
        <div class="home__user__infos">
          <p class="home__user__infos__name">Bonjour, {{ data.name }} <br /></p>
          <p class="home__user__infos__store">
            {{ data.storeToString }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <StoreVendorSelector @id-change="getVendorId" />
    </div>
    <div>
      <TimeSelector2 @date-change="getStat" :currentDate="currentDate" />
    </div>
    <div v-if="error">{{ error }}</div>

    <div v-if="data">
      <div class="total">
        <div v-if="yearStat === 'year'" class="numbers">
          <h3>TOTAL : {{ stat.nb_total }}</h3>
        </div>
        <div v-if="yearStat !== 'year'" class="numbers">
          <!-- <ChartsTotal :total="stat.nb_total" :percentage="percentage" /> -->
          <ChartsTotal :total="stat.nb_total" :percentage="percentage" />
        </div>
      </div>
      <div v-if="stat.nb_vn" class="numbers">
        <ChartsRates
          title="VN"
          :total="stat.nb_vn"
          :txPres="`${stat.tx_pres_fm_vn}%`"
          :txFm="`${stat.tx_fm_vn}%`"
          :txCe="`${stat.tx_ce_vn}%`"
        />
      </div>
      <div v-if="stat.nb_vo" class="numbers">
        <ChartsRates
          title="VO"
          :total="stat.nb_vo"
          :txPres="`${stat.tx_pres_fm_vo}%`"
          :txFm="`${stat.tx_fm_vo}%`"
          :txCe="`${stat.tx_ce_vo}%`"
        />
      </div>
    </div>

    <!-- TEST -->
    <!-- <div>
      <pre> {{ data }}  </pre>
    </div> -->
  </div>
</template>

<script>
// import { getData } from "../modules/api";
import fetchData from "../modules/api3";
import TimeSelector2 from "../components/TimeSelector2.vue";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsTotal2 from "../components/ChartsTotal2.vue";
import ChartsRates from "../components/ChartsRates.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import Img1 from "../assets/photos/vendor.jpg";

export default {
  components: { TimeSelector2, ChartsTotal, ChartsRates, StoreVendorSelector },
  mounted() {},
  data() {
    return {
      data: null,
      error: null,
      stat: null,
      objectives: null,
      total: null,
      yearStat: null,
      vendorId: null,
      images: [Img1],
      currentDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
    };
  },
  computed: {
    percentage() {
      let percentage = Math.round((this.total / this.objectives) * 100);
      return Math.min(percentage, 100);
    },
  },
  methods: {
    getStat(date) {
      let data = [date.year, date.month, this.vendorId];
      fetchData("vendorStat", data)
        .then((res) => {
          this.data = res;
          this.yearStat = date.month;
          date.month === "year"
            ? (this.stat = res.select.stat)
            : (this.stat = res.month.stat);
          date.month === "year"
            ? (this.objectives = null)
            : (this.objectives = res.month.objectives.total);

          date.month === "year"
            ? (this.total = null)
            : (this.total = res.month.stat.nb_total);

          this.error = null;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
          // this.stat = null;
        });
    },

    getVendorId(selectedVendor) {
      console.log("ID", selectedVendor);
      this.vendorId = selectedVendor;
      this.getStat(this.currentDate);
    },
  },
};
</script>

<style lang="scss">
.home {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  background: var(--primary);

  &__user {
    display: flex;

    &__image {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--secondary);
      padding: 2px;
    }

    &__infos {
      padding: 5px 0 0 20px;

      &__name {
        font-size: 16px;
        margin: 0;
      }

      &__store {
        font-size: 12px;
        color: var(--gray);
      }
    }
  }
}

input,
select {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
