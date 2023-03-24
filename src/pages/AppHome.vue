<template>
  <div class="home">
    <TopBar />
    <div v-if="SelectedUser">
      <UserInfos
        :name="SelectedUser.name"
        :store="SelectedUser.storeToString"
      />
    </div>
    <NavSection />

    <div>
      <StoreVendorSelector
        @id-change="getVendorId"
        @user-change="getSelectedUser"
      />
    </div>
    <div>
      <TimeSelector @date-change="getStat" :currentDate="currentDate" />
    </div>
    <div v-if="error">{{ error }}</div>

    <div v-if="data">
      <div class="total">
        <div v-if="yearStat === 'year'">
          <h3>Total : {{ stat.nb_total }}</h3>
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

      <div class="separator" v-if="stat.nb_vo"></div>
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

    <!-- TEST -->
    <!-- <div>
      <pre> {{ data }}  </pre>
    </div> -->
  </div>
</template>

<script>
// import { getData } from "../modules/api";
import fetchData from "../modules/api3";
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
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
    ChartsTotal,
    ChartsRates,
  },
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
      image: Img1,
      SelectedUser: null,
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

    getSelectedUser(user) {
      this.SelectedUser = user;
      console.log("SelectedUser", this.SelectedUser);
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
  min-height: 100vh;
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
