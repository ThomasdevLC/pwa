<template>
  <div class="home" v-if="store.stores">
    <TopBar @custom-reload="callInitApp" />

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

    <LoaderComponent class="loader" v-if="!stat && !error" />

    <div v-if="stat && !error">
      <div class="total">
        <div>
          <h3>
            VENTES TOTALES <br />
            <span style="font-weight: 700"> {{ stat.nb_total }} </span>
          </h3>
        </div>
        <div v-if="objectives">
          <ChartsTotal :total="stat.nb_total" :percentage="percentage" />
        </div>
      </div>
      <div v-if="stat.nb_vn">
        <h3>
          VN <span class="vhtype"> {{ stat.nb_vn }}</span>
        </h3>
        <ChartsRates title="Vn" :total="stat.nb_vn" :txPres="stat.tx_pres_fm_vn" :txFm="stat.tx_fm_vn" :txCe="stat.tx_ce_vn" />
      </div>

      <div class="separator" v-if="stat.nb_vo && stat.nb_vn"></div>
      <div v-if="stat.nb_vo">
        <h3>
          VO <span class="vhtype"> {{ stat.nb_vo }}</span>
        </h3>
        <ChartsRates title="Vo" :total="stat.nb_vo" :txPres="stat.tx_pres_fm_vo" :txFm="stat.tx_fm_vo" :txCe="stat.tx_ce_vo" />
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
import { ref, computed } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { fetchData } from "../api";
import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsRates from "../components/ChartsRates.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
const $router = useRouter();

const store = useStore();

if (!store.user) $router.push("/login");

const stat = ref();
const objectives = ref();
const total = ref();
const yearStat = ref();
const error = ref();

const getStat = async () => {
  if (!check()) return;

  let date = store.date;
  let dateType = date.month === "year" ? "year" : "month";
  let data = [date.year, date.month, store.selectedVendor];

  stat.value = null;
  error.value = null;

  try {
    const res = await fetchData("vendorStat", data);

    stat.value = dateType === "year" ? res.select.stat : res.month.stat;
    objectives.value = dateType === "year" ? null : res.month.objectives.total;
    total.value = dateType === "year" ? null : res.month.stat.nb_total;
  } catch (error) {
    console.error("fetchData vendorStat" + error);
    error.value = "Aucune donnée disponible";
  }
};

const check = () => {
  if (store.selectedStore === null) {
    error.value = "Veuillez sélectionner une concession";
    return false;
  }

  if (store.selectedVendor === null) {
    error.value = "Veuillez sélectionner un vendeur";
    return false;
  }

  error.value = null;
  return true;
};

const percentage = computed(() => {
  let percentage = Math.round((total.value / objectives.value) * 100);
  return Math.min(percentage, 100);
});

const callInitApp = async () => {
  stat.value = null;
  error.value = null;
  await store.initApp();
  getStat();
};
</script>
