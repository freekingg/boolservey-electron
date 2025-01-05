import { defineStore } from "pinia";

export const useQuotaStore = defineStore({
  id: "quota",
  state: () => ({
    quota_drawer: false,
    quota: null,
  }),

  getters: {},
  actions: {
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.quota_drawer = payload;
    },
    SET_QAUOTA(payload: any) {
      this.quota = payload;
    },
  },
});
