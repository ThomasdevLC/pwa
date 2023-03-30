import { defineStore } from "pinia";
import fetchData from "./modules/api";

export const useStore = defineStore("store", {
  state: () => ({
    user: null,
    selectedVendor: null,
    selectedStore: null,
    stores: null,
    vendors: null,
    vendorsList: null,
    currentDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
    date: null,
  }),
  getters: {},
  actions: {
    initApp() {
      console.log("INIT APP");

      this.getStores();
      this.getVendors();
      this.refreshDate();

      if (this.user.role === "Vendor") this.selectedVendor = this.user.id;
    },
    getStores() {
      fetchData("stores")
        .then((res) => {
          this.stores = [...res].filter((store) =>
            this.user.stores.includes(store.store_id)
          );

          this.selectedStore = this.user.singleStore ? this.user.store : null;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },
    getVendors() {
      fetchData("vendors")
        .then((res) => {
          // console.log(" vendorsApi res", res);
          this.vendors = res;
          this.getVendorsList();
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },
    getVendorsList() {
      // console.log("storesChange", this.vendors)
      this.vendorsList = [...this.vendors].filter(
        (vendor) => this.selectedStore === vendor.store
      );
    },
    refreshDate() {
      console.log("refreshDate", this.currentDate);
      this.date = { ...this.currentDate };
      if (this.user.role !== "Vendor") this.selectedVendor = null;
    },
  },
});
