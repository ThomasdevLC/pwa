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
  </div>
  <h1>hello</h1>

  <pre style="color: white">{{ test }}</pre>
</template>

<script>
import { useStore } from "../store";
import fetchData from "../modules/api";
import TopBar from "../components/TopBar.vue";
import UserInfos from "../components/UserInfos.vue";
import NavSection from "../components/NavSection.vue";
import StoreVendorSelector from "../components/StoreVendorSelector.vue";
import TimeSelector from "../components/TimeSelector.vue";

export default {
  components: {
    TopBar,
    UserInfos,
    NavSection,
    StoreVendorSelector,
    TimeSelector,
  },

  created() {
    if (!this.store.user) this.$router.push("/login");
    else this.store.initApp();
  },
  data() {
    return {
      store: useStore(),
      test: null,
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
          this.test = res;
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

<style></style>
