<template>
  <div class="home" v-if="store.stores">
    <TopBar @reload="getStat" />

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

    <div v-if="storeStat">
      <div v-if="storeStat && storeStat.nb_vn">
        <h3>
          VN <span class="vhtype"> {{ storeStat.nb_vn }}</span>
        </h3>

        <ChartsSemiStore title="CONST" :total="storeStat.nb_vn" :obj="storeObjectives.obj_vn_const" :key="reloadKey" />

        <ChartsSemiStore title="GCA" :total="storeStat.nb_vn" :obj="storeObjectives.obj_vn_gca" :key="reloadKey" />
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
      <div class="separator" v-if="storeStat && storeStat.nb_vo && storeStat.nb_vn"></div>
      <div v-if="storeStat && storeStat.nb_vo">
        <h3>
          VO <span class="vhtype"> {{ storeStat.nb_vo }}</span>
        </h3>
        <ChartsSemiStore title="GCA" :total="storeStat.nb_vo" :obj="storeObjectives.obj_vo" :key="reloadKey" />
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

<script setup>
import { ref } from "vue";
import { useStore } from "../store";
import { fetchData } from "../api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsRates from "../components/ChartsRates.vue";
import ChartsSemiStore from "../components/ChartsSemiStore.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const store = useStore();

if (!store.user) $router.push("/login");

const storeStat = ref();
const storeObjectives = ref();
const error = ref();
const reloadKey = ref(0);

const getStat = async () => {
  if (!check()) return;

  let data = [store.date.year, store.date.month, store.selectedStore];

  try {
    const res = await fetchData("storeStat", data);
    storeStat.value = res.stat;
    storeObjectives.value = res.objectives;
    reloadKey.value += 1;
  } catch (error) {
    console.error("fetchData " + error);
    error.value = "Aucune donnée disponible";
  }
};

const check = () => {
  if (store.selectedStore === null) {
    error.value = "Veuillez sélectionner une concession";
    return false;
  }

  return true;
};
</script>
