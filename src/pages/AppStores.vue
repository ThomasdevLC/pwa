<template>
  <div class="home" v-if="store.stores && store.vendorsList">
    <TopBar :user="store.user" @reload="handleReload" />

    <UserInfos :name="store.user.name" :store="store.user.storeToString" />
    <div>
      <NavSection />
    </div>

    <div>
      <StoreVendorSelector @vendorChange="getStat" />
    </div>

    <div>
      <TimeSelector @date-change="dateChange" />
    </div>

    <div v-if="storeStat && storeStat.nb_vn"></div>

    <div v-if="storeStat && storeStat.nb_vn">
      <ChartsSemiStore
        title="CONST"
        :total="storeStat.nb_vn"
        :obj="storeObjectives.obj_vn_const"
      />

      <ChartsSemiStore
        title="GCA"
        :total="storeStat.nb_vn"
        :obj="storeObjectives.obj_vn_gca"
      />
      <ChartsRates
        title="Vn"
        :total="storeStat.nb_vn"
        :txPres="storeStat.tx_pres_fm_vn"
        :txFm="storeStat.tx_fm_vn"
        :txCe="storeStat.tx_ce_vn"
      />
    </div>
    <div
      class="separator"
      v-if="storeStat && storeStat.nb_vo && storeStat.nb_vn"
    ></div>
    <div v-if="storeStat && storeStat.nb_vo">
      <ChartsRates
        title="Vo"
        :total="storeStat.nb_vo"
        :txPres="storeStat.tx_pres_fm_vo"
        :txFm="storeStat.tx_fm_vo"
        :txCe="storeStat.tx_ce_vo"
      />
    </div>
  </div>

  <!-- <pre style="color: white">{{ storeStat }}</pre> -->
</template>

<script>
import { useStore } from "../store";
import fetchData from "../modules/api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsRates from "../components/ChartsRates.vue";
import ChartsSemiStore from "../components/ChartsSemiStore.vue";

export default {
  components: {
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
    ChartsRates,
    ChartsSemiStore,
  },

  created() {
    if (!this.store.user) this.$router.push("/login");
    else this.store.initApp();
  },
  data() {
    return {
      store: useStore(),
      storeStat: null,
      storeObjectives: null,
    };
  },
  methods: {
    dateChange() {
      this.getStat();
    },

    handleReload() {
      console.log("reload");
      this.store.initApp();
      this.getStat();
    },

    getStat() {
      console.log("Fetching", this.store.user);
      console.log("getStat", this.store.date);
      let date = this.store.date;
      let data = [date.year, date.month, this.store.selectedStore];
      console.log("data", data);
      fetchData("storeStat", data)
        .then((res) => {
          this.storeStat = res.stat;
          this.storeObjectives = res.objectives;
          console.log(this.storeObjectives);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getStat();
  },
};
</script>

<style lang="scss"></style>
