// import Vue from "vue";
import { getLocalUser } from "@/helpers/auth";

const user = getLocalUser();

const state = {
  currentUser: user,
  isSignedIn: !!user,
  loading: false,
  auth_error: null,
};
const getters = {
  isLoading(state) {
    return state.loading;
  },

  isSignedIn(state) {
    return state.isSignedIn;
  },

  currentUser(state) {
    return state.currentUser;
  },

  authError(state) {
    return state.auth_error;
  },
};
const mutations = {
  signIn(state) {
    state.loading = true;
    state.auth_error = null;
  },

  signInSuccess(state, payload) {
    state.auth_error = null;
    state.isSignedIn = true;
    state.loading = false;
    state.currentUser = payload;
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    // Vue.prototype.$user.set(state.currentUser);
  },

  signInFailed(state, payload) {
    state.loading = false;
    state.auth_error = payload.error;
  },

  logout(state) {
    localStorage.removeItem("user");
    state.isSignedIn = false;
    state.currentUser = null;
    localStorage.clear();
  },
};
const actions = {
  signIn({ commit }) {
    commit("signIn");
  },
};

export default { state, getters, mutations, actions };
