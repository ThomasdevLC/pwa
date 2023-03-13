<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>

    <pre> vendeur {{ vendors }}</pre>
    <pre> stores {{ stores }}</pre>
  </div>
</template>

<script>
import { vendorsApi, storesApi } from "../modules/api";

export default {
  mounted() {
    this.getVendors();
    this.getStores();
  },

  data() {
    return {
      count: 0,
      vendors: null,
      stores: null,
      selectedVendor: null,
      selectedStore: null,
      data: null,
      error: null,
    };
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
  },
};
</script>
