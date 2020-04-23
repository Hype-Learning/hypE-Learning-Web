import { getLocalUser, getLocalEmail } from "@/helpers/auth";

const user = getLocalUser();
const email = getLocalEmail();

const state = {
  currentUser: user,
  isSignedIn: !!user,
  loading: false,
  auth_error: null,
  email: email,
};
const getters = {
  isLoading(state) {
    return state.isSignedIn;
  },

  isSignedIn(state) {
    return state.loading;
  },

  currentUser(state) {
    return state.currentUser;
  },

  authError(state) {
    return state.auth_error;
  },
  currentEmail(state) {
    return state.email;
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
    state.currentUser = payload.accessToken;
    state.email = JSON.parse(atob(state.currentUser.split(".")[1])).email;

    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("email", JSON.stringify(state.email));
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
