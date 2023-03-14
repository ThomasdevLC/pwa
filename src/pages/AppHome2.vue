<template>
  <div>
    <vSelect
      v-if="stores"
      v-model="selectedStore"
      :options="stores"
      label="store_name"
      :reduce="(v) => v.store_id"
      :clearable="false"
      @update:modelValue="storesChange"
    />

    <vSelect
      v-if="vendorsList"
      v-model="selectedVendor"
      :options="vendorsList"
      label="fullName"
      :reduce="(v) => v.id"
      :clearable="false"
    />

    <pre>user : {{ user }}</pre>

    <pre> vendeur SELECTIONNE {{ selectedVendor }}</pre>
    <pre> store SELECTIONNE {{ selectedStore }}</pre>
    <!-- <pre> stores {{ stores }}</pre> -->
    <!-- <pre> stores {{ stores }}</pre> -->
  </div>
</template>

<script>
import vSelect from "vue-select";
import { vendorsApi, storesApi, userApi } from "../modules/api";

export default {
  components: { vSelect },

  mounted() {
    this.getVendors();
    this.getStores();
    userApi().then((res) => {
      this.user = res;
    });
  },

  data() {
    return {
      user: null,
      vendors: null,
      stores: null,
      selectedVendor: null,
      selectedStore: null,
      vendorsList: null,
      error: null,
    };
  },

  watch: {
    selectedStore(val) {
      console.log("WATCH", val);
      this.vendorsList = [...this.vendors];
    },
  },

  methods: {
    getVendors() {
      vendorsApi()
        .then((res) => {
          console.log(" vendorsApi res", res);

          this.vendors = res;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },
    getStores() {
      storesApi()
        .then((res) => {
          console.log(" storesApi res", res);

          this.stores = res;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },

    storesChange() {
      console.log(this.selectedStore);
    },
  },
};
</script>
<style>
@import "vue-select/dist/vue-select.css";
</style>
