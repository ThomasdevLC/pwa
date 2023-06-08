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
    error: null,
  }),
  getters: {},
  actions: {
    initApp() {
      console.log("INIT APP");

      this.getStores();
      this.getVendors();
      this.refreshDate();
      this.checkSelections();
    },

    getStores() {
      fetchData("stores")
        .then((res) => {
          this.stores = [...res].filter(
            (store) => this.user.stores.includes(store.id),

            console.log("stores", this.stores)
          );
          this.selectedStore = this.user.store;
          if (this.user.role !== "Vendor") this.selectedStore = null;
          console.log("selectedStore", this.selectedStore);
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },

    getVendors() {
      fetchData("vendors")
        .then((res) => {
          this.vendors = res;
          this.getVendorsList();
          this.selectedVendor = this.user.id;
          if (this.user.role !== "Vendor") this.selectedVendor = null;
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },

    getVendorsList() {
      this.vendorsList = [...this.vendors].filter(
        (vendor) => this.selectedStore === vendor.store
      );
    },

    refreshDate() {
      console.log("refreshDate", this.currentDate);
      this.date = { ...this.currentDate };
      if (this.user.role !== "Vendor") this.selectedVendor = null;
    },

    checkSelections() {
      if (this.selectedVendor === null && this.selectedStore === null) {
        this.error = "Veuillez sélectionner une concession et un vendeur";
      } else if (this.selectedVendor === null) {
        this.error = "Veuillez sélectionner un vendeur";
      } else if (this.selectedStore === null) {
        this.error = "Veuillez sélectionner une concession";
      }
    },
  },
});
