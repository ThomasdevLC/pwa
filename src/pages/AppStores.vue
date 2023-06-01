<template>
  <div class="home" v-if="store.stores && store.vendorsList">
    <TopBar @reload="handleReload" />

    <UserInfos />
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
      <h3>
        VN <span> {{ storeStat.nb_vn }}</span>
      </h3>

      <ChartsSemiStore
        title="CONST"
        :total="storeStat.nb_vn"
        :obj="storeObjectives.obj_vn_const"
        :key="reloadKey"
      />

      <ChartsSemiStore
        title="GCA"
        :total="storeStat.nb_vn"
        :obj="storeObjectives.obj_vn_gca"
        :key="reloadKey"
      />
      <ChartsRates
        title="Vn"
        :total="storeStat.nb_vn"
        :txPres="storeStat.tx_pres_fm_vn"
        :txFm="storeStat.tx_fm_vn"
        :txCe="storeStat.tx_ce_vn"
        :objPres="storeObjectives.obj_tx_pres_fm"
        :objFm="storeObjectives.obj_tx_fm"
        :objCe="storeObjectives.obj_tx_ce"
      />
    </div>
    <div
      class="separator"
      v-if="storeStat && storeStat.nb_vo && storeStat.nb_vn"
    ></div>
    <div v-if="storeStat && storeStat.nb_vo">
      <h3>
        VO <span> {{ storeStat.nb_vo }}</span>
      </h3>
      <ChartsSemiStore
        title="GCA"
        :total="storeStat.nb_vo"
        :obj="storeObjectives.obj_vo"
        :key="reloadKey"
      />
      <ChartsRates
        title="Vo"
        :total="storeStat.nb_vo"
        :txPres="storeStat.tx_pres_fm_vo"
        :txFm="storeStat.tx_fm_vo"
        :txCe="storeStat.tx_ce_vo"
        :objPres="storeObjectives.obj_tx_pres_fm_vo"
        :objFm="storeObjectives.obj_tx_fm_vo"
        :objCe="storeObjectives.obj_tx_ce_vo"
      />
    </div>
  </div>

  <!-- <pre style="color: white">{{ storeObjectives.obj_tx_ce_vo }}</pre> -->
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
      reloadKey: 0, // Nouvelle propriété reloadKey
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
          // Incrémenter la valeur de reloadKey pour déclencher un re-render du composant ChartsSemiStore
          this.reloadKey += 1;
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

<style lang="scss" scoped>
h3 {
  font-weight: 300;
  margin-bottom: 15px;
}

span {
  font-weight: 700;
  margin-left: 10px;
}
</style>
