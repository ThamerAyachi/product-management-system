import { createStore } from "vuex";
import instance from "../axios";

export default createStore({
  state: {
    access_token: localStorage.getItem("access_token"),
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, data) {
      state.access_token = data.token;
      localStorage.setItem("access_token", data.token);
    },
    LOGOUT: (state) => {
      localStorage.removeItem("access_token");
      state.access_token = null;
    },
  },
  actions: {
    register: async (test, data) => {
      try {
        const res = await instance.post("users/create", data);
        return res;
      } catch (err) {
        return err.message;
      }
    },
    login: async ({ commit }, data) => {
      try {
        const res = await instance.post("auth/login", data);
        commit("SET_TOKEN", res.data);
        return res.data;
      } catch (err) {
        return err.response.data;
      }
    },
    logout: async ({ commit }) => {
      commit("LOGOUT");
    },
    getProducts: async () => {
      try {
        const res = await instance.get("products");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    getUser: async () => {
      try {
        const res = await instance.get("users/user");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
