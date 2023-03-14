<template>
  <div>
    <input
      v-model="userId"
      type="text"
      @keydown.enter="getUser(userId)"
      required
    />

    <vSelect
      v-if="stores"
      v-model="selectedStore"
      :options="stores"
      label="store_name"
      :reduce="(v) => v.store_id"
      :clearable="true"
      @update:modelValue="storesChange"
    />

    <vSelect
      v-if="vendorsList"
      v-model="selectedVendor"
      :options="vendorsList"
      label="fullName"
      :reduce="(v) => v.id"
      :clearable="true"
    />

    <pre> vendeur SELECTIONNE {{ selectedVendor }}</pre>
    <pre> store SELECTIONNE {{ selectedStore }}</pre>
    <div class="prediv">
      <pre>user : {{ user }}</pre>

      <pre> stores {{ stores }}</pre>
      <pre> vendors {{ vendors }}</pre>
    </div>
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
    this.getUser();
  },

  data() {
    return {
      userId: "",
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
    user(val) {
      console.log("WATCH", val);
      this.stores = [...this.stores].filter((store) =>
        this.user.stores.includes(store.store_id)
      );
    },

    selectedStore(val) {
      console.log("WATCH", val);
      this.vendorsList = [...this.vendors].filter(
        (vendor) => this.stores.store_id === vendor.store
      );
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

    getUser(userId) {
      userApi(userId)
        .then((res) => {
          console.log(" userApi res", res);
          this.user = res;

          console.log(this.stores);
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

.prediv {
  display: flex;
}
</style>
