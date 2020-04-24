import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import StoreData from "./store";
import VueRouterUserRoles from "vue-router-user-roles";

// import { initialize } from "./helpers/general";

import vuetify from "./plugins/vuetify";
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouterUserRoles, { router });

const store = new Vuex.Store(StoreData);

// initialize(store, router);
let authenticate = Promise.resolve({ role: "instructor" });
authenticate.then((user) => {
  Vue.prototype.$user.set(user);
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
