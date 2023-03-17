<template>
  <div>
    <div v-if="user">
      <h3>Bonjour : {{ user.name }} {{ user.surname }}</h3>
      <h5>{{ user.role }}</h5>
    </div>

    <input
      v-model="userId"
      type="text"
      @keydown.enter="getUser(userId)"
      required
      :clearable="true"
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
      @update:modelValue="idChange"
    />

    <!-- <pre> user connecté {{ user }}</pre> -->
    <!-- <pre> vendorsList {{ vendorsList }}</pre>
    <pre> VENDEUR SELECTIONNE {{ selectedVendor }}</pre>
    <pre> STORE SELECTIONNE {{ selectedStore }}</pre> -->
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
    this.$emit("id-change", this.selectedVendor);
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
    user(user) {
      this.stores = [...this.stores].filter((store) =>
        user.stores.includes(store.store_id)
      );

      this.selectedStore = user.singleStore ? user.store : null;
      this.storesChange();

      if (user.role === "Vendor") {
        this.selectedVendor = user.id;
        this.idChange();
      } else {
        this.selectedVendor = null;
        console.log("Vendor", this.selectedVendor);
      }
    },
  },

  methods: {
    getVendors() {
      vendorsApi()
        .then((res) => {
          // console.log(" vendorsApi res", res);
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
          // console.log(" storesApi res", res);
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
          // console.log(" userApi res", res);
          this.user = res;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },

    storesChange() {
      console.log("storesChange", this.selectedStore);

      this.vendorsList = [...this.vendors].filter(
        (vendor) => this.selectedStore === vendor.store
      );

      this.selectedVendor = null;
    },

    idChange() {
      this.$emit("id-change", this.selectedVendor);
    },
  },
};
</script>
<style scoped>
@import "vue-select/dist/vue-select.css";

.prediv {
  display: flex;
}
</style>
