import { defineStore } from "pinia";

export const useFlowStore = defineStore({
  id: "flow",
  state: () => ({
    flow_drawer: false,
  }),

  getters: {},
  actions: {
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.flow_drawer = payload;
    },

  },
});
