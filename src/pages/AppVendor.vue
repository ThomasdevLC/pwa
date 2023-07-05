<template>
  <div class="home" v-if="store.stores">
    <TopBar
      @reload="
        this.store.initApp();
        this.getStat();
      "
    />

    <UserInfos />
    <div>
      <NavSection />
    </div>

    <div>
      <StoreVendorSelector @vendorChange="getStat" />
    </div>

    <div>
      <TimeSelector @date-change="getStat" />
    </div>

    <!-- <pre style="color: white">{{ this.data }}</pre> -->
    <LoaderComponent class="loader" v-if="!statData && !error" />

    <div v-if="statData && !error">
      <div class="total">
        <div v-if="yearStat === 'year'">
          <h3>
            VENTES TOTALES <br />
            <span style="font-weight: 700"> {{ stat.nb_total }} </span>
          </h3>
        </div>
        <div v-if="yearStat !== 'year'">
          <ChartsTotal :total="stat.nb_total" :percentage="percentage" />
        </div>
      </div>
      <div v-if="stat.nb_vn">
        <ChartsRates
          title="Vn"
          :total="stat.nb_vn"
          :txPres="stat.tx_pres_fm_vn"
          :txFm="stat.tx_fm_vn"
          :txCe="stat.tx_ce_vn"
        />
      </div>

      <div class="separator" v-if="stat.nb_vo && stat.nb_vn"></div>
      <div v-if="stat.nb_vo">
        <ChartsRates
          title="Vo"
          :total="stat.nb_vo"
          :txPres="stat.tx_pres_fm_vo"
          :txFm="stat.tx_fm_vo"
          :txCe="stat.tx_ce_vo"
        />
      </div>
    </div>
    <div class="error" v-else>
      <div v-if="error">{{ error }}</div>
      <div v-if="store.user.role !== 'Vendor' && store.errorSelect">
        {{ store.errorSelect }}
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store";
import fetchData from "../modules/api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsRates from "../components/ChartsRates.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import Img1 from "../assets/photos/vendor.jpg";

export default {
  components: {
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
    ChartsTotal,
    ChartsRates,
    LoaderComponent,
  },
  created() {
    if (!this.store.user) this.$router.push("/login");
    else this.store.initApp();
  },
  data() {
    return {
      store: useStore(),
      statData: null,
      error: null,
      stat: null,
      objectives: null,
      total: null,
      yearStat: null,
      image: Img1,
    };
  },
  methods: {
    handleReload() {
      console.log("reload");
      this.store.initApp();
      this.getStat();
    },

    getStat() {
      console.log("getStat", this.store.date);
      let date = this.store.date;
      let data = [date.year, date.month, this.store.selectedVendor];

      fetchData("vendorStat", data)
        .then((res) => {
          this.statData = res;
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
          this.error = "Aucune donnée disponible ";
          this.stat = null;
        });
    },
  },
  computed: {
    percentage() {
      let percentage = Math.round((this.total / this.objectives) * 100);
      return Math.min(percentage, 100);
    },
  },
  watch() {},
};
</script>

<style lang="scss">
@use "../assets/styles/mixins" as mixin;

.home {
  margin: 0 auto;
  padding: 30px 20px !important;
  max-width: 920px;
  background: var(--primary);
  min-height: 100vh;
}

.total {
  text-align: center;
}
.total h3 {
  font-weight: 300;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
