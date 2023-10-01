<template>
  <div class="home" v-if="store.stores">
    <TopBar @reload="handleReload" />

    <UserInfos />
    <div>
      <NavSection />
    </div>

    <div>
      <StoreVendorSelector @vendorChange="getStat" @store-change="getStat" />
    </div>

    <div>
      <TimeSelector @date-change="getStat" />
    </div>

    <LoaderComponent class="loader" v-if="!storeStat && !error" />

    <div v-if="store.selectedStore">
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
import {fetchData} from "../api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsRates from "../components/ChartsRates.vue";
import ChartsSemiStore from "../components/ChartsSemiStore.vue";
import LoaderComponent from "../components/LoaderComponent.vue";

export default {
  components: {
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
    ChartsRates,
    ChartsSemiStore,
    LoaderComponent,
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
      error: null,
      reloadKey: 0, // Nouvelle propriété reloadKey
    };
  },
  methods: {
    handleReload() {
      console.log("reload");
      this.store.initApp();
      this.getStat();
    },

    getStat() {
      let date = this.store.date;
      let data = [date.year, date.month, this.store.selectedStore];
      fetchData("storeStat", data)
        .then((res) => {
          this.storeStat = res.stat;
          this.storeObjectives = res.objectives;
          // Incrémenter la valeur de reloadKey pour déclencher un re-render du composant ChartsSemiStore
          this.reloadKey += 1;

          console.log("store.selectedStore", this.store.selectedStore);
        })
        .catch((error) => {
          console.error(error);
          this.error = "Aucune donnée disponible ";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 0 auto;
  padding: 30px 20px;
  max-width: 920px;
  background: var(--primary);
  min-height: 100vh;
}

h3 {
  font-weight: 300;
  margin-bottom: 15px;
}

span {
  font-weight: 700;
  margin-left: 10px;
}
</style>
