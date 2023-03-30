<template>
  <div class="home" v-if="store.stores && store.vendorsList">
    <TopBar :user="store.user" />

    <UserInfos :name="store.user.name" :store="store.user.storeToString" />

    <NavSection />

    <div>
      <StoreVendorSelector @vendorChange="getStat" />
    </div>

    <div>
      <TimeSelector @date-change="dateChange" :currentDate="currentDate" />
    </div>

    <div v-if="data && !error">
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
          :txPres="`${stat.tx_pres_fm_vn}%`"
          :txFm="`${stat.tx_fm_vn}%`"
          :txCe="`${stat.tx_ce_vn}%`"
        />
      </div>

      <div class="separator" v-if="stat.nb_vo && stat.nb_vn"></div>
      <div v-if="stat.nb_vo">
        <ChartsRates
          title="Vo"
          :total="stat.nb_vo"
          :txPres="`${stat.tx_pres_fm_vo}%`"
          :txFm="`${stat.tx_fm_vo}%`"
          :txCe="`${stat.tx_ce_vo}%`"
        />
      </div>
    </div>

    <div style="color: white">
      <div class="row">
        <!--        <div class="col col-3">
          <h3>USER</h3>
          <pre>{{store.user}}</pre>
        </div>

        <div class="col col-3">
          <h3>STORES</h3>
          <pre>{{store.stores}}</pre>
        </div>

        <div class="col col-3">
          <h3>VENDORS</h3>
          <pre>{{store.vendors}}</pre>
        </div>-->

        <div class="col col-3">
          <h3>SelectedStore</h3>
          <pre>{{ store.selectedStore }}</pre>
        </div>

        <div class="col col-3">
          <h3>SelectedVendor</h3>
          <pre>{{ store.selectedVendor }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { useStore } from "../store";
import fetchData from "../modules/api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import NavSection from "../components/NavSection.vue";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsRates from "../components/ChartsRates.vue";
import Img1 from "../assets/photos/vendor.jpg";

export default {
  components: {
    vSelect,
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
    ChartsTotal,
    ChartsRates,
  },
  created() {
    this.store.initApp();
  },
  data() {
    return {
      store: useStore(),
      data: null,
      error: null,
      stat: null,
      objectives: null,
      total: null,
      yearStat: null,
      vendorId: null,
      image: Img1,
      currentDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      selectedDate: this.currentDate,
    };
  },
  methods: {
    dateChange(date) {
      this.selectedDate = date;
      this.getStat();
    },
    getStat() {
      let date = this.selectedDate;
      let data = [date.year, date.month, this.store.selectedVendor];
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
@import "vue-select/dist/vue-select.css";

.home {
  margin: 0 auto;
  max-width: 920px;
  padding: 20px;
  background: var(--primary);
  min-height: 100vh;
}

.total {
  text-align: center;
}
.total h3 {
  font-weight: 300;
}

.separator {
  border-bottom: 1px solid var(--gray);
  width: 70%;
  margin: 30px auto;
}

input {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
