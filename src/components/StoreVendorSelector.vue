<template>
  <div class="search">
    <input
      v-model="userId"
      type="text"
      @keydown.enter="getUser(userId)"
      required
      :clearable="true"
    />
    <div class="search__box">
      <div class="search__box__icon">
        <i class="fa-solid fa-warehouse"></i>
      </div>
      <vSelect
        class="search__box__select"
        v-if="stores"
        v-model="selectedStore"
        :options="stores"
        label="store_name"
        :reduce="(v) => v.store_id"
        placeholder="concession"
        @update:modelValue="storesChange"
      />
    </div>

    <div v-if="vendorsList" class="search__box">
      <div class="search__box__icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <vSelect
        class="search__box__select"
        v-if="vendorsList"
        v-model="selectedVendor"
        :options="vendorsList"
        label="fullName"
        :reduce="(v) => v.id"
        placeholder="vendeur"
        @update:modelValue="idChange"
      />
    </div>

    <!-- <pre> user connecté {{ user }}</pre> -->
    <!-- <pre> vendorsList {{ vendorsList }}</pre>
    <pre> VENDEUR SELECTIONNE {{ selectedVendor }}</pre>
    <pre> STORE SELECTIONNE {{ selectedStore }}</pre> -->
  </div>
</template>

<script>
import vSelect from "vue-select";
// import { vendorsApi, storesApi, userApi } from "../modules/api";
import fetchData from "../modules/api3";

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
      userId: "1283",
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
      fetchData("vendors")
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
      fetchData("stores")
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
      let data = [userId];
      fetchData("user", data)
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
<style scoped lang="scss">
@import "vue-select/dist/vue-select.css";

input {
  color: var(--gray);
  background: var(--primary);
  border: none;
  outline: none;
}

.search__box {
  display: flex;
  &__select {
    height: 32px;
    width: 100%;
    background: black;
    border-radius: 0px 6px 6px 0px;
    margin-bottom: 10px;
  }
  &__icon {
    height: 32px;
    background: black;
    color: white;
    padding: 10px;
    border-radius: 6px 0 0 6px;
    display: flex;
    justify-content: center;
  }
}

.search__box__select {
  --vs-controls-color: var(--gray);
  --vs-search-input-bg: black;
  --vs-border-width: 0px;

  --vs-dropdown-bg: black;
  --vs-dropdown-color: var(--gray);
  --vs-dropdown-option-color: var(--gray);

  --vs-selected-bg: var(--purple);
  --vs-selected-color: white;

  --vs-search-input-color: white;

  --vs-dropdown-option--active-bg: var(--purple);
  --vs-dropdown-option--active-color: white;
}
</style>
