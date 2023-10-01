import {defineStore} from "pinia";
import {fetchData} from "./api";

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
            month: new Date().getMonth(),
        },
        date: null,
        errorSelect: null,
        isInit: false
    }),
    getters: {},
    actions: {
        async initApp() {
            return new Promise(async (resolve, reject) => {
                try {
                    await Promise.all([this.getStores(), this.getVendors()]);
                    this.initDate();
                    this.isInit = true
                    resolve()
                } catch (error) {
                    console.error('initApp', error)
                    reject(error);
                }
            });
        },

        async getStores() {
            return new Promise(async (resolve, reject) => {
                try {
                    let stores = await fetchData("stores");
                    this.stores = [...stores].filter(
                        (store) => this.user.stores.includes(store.id)
                    );

                    if (this.user.hasStore)
                        this.selectedStore = this.user.store;

                    resolve();
                } catch (error) {
                    console.error('getStores', error)
                    reject(error);
                }
            });
        },

        async getVendors() {
            return new Promise(async (resolve, reject) => {
                try {
                    this.vendors = await fetchData("vendors");
                    this.getVendorsList();
                    this.selectedVendor = this.user.role === "Vendor" ? this.user.id : null;
                    if (this.user.role !== "Vendor") this.selectedVendor = null;
                    resolve();
                } catch (error) {
                    console.error('getStores', error)
                    reject(error);
                }
            });
        },

        getVendorsList() {
            this.vendorsList = [...this.vendors].filter(
                (vendor) => this.selectedStore === vendor.store
            );
        },

        initDate() {
            const today = new Date();
            const month = today.getMonth()
            const day = today.getDate()
            this.date = {
                year: today.getFullYear(),
                month: day < 5 ? month : month + 1,
            };
        },
    },
});
