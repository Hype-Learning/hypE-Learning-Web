import axios from "axios";
export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const currentUser = store.state.currentUser;
    const role = currentUser.role;

    if (!role && !currentUser) {
      next("/signin");
    } else if (to.path == "/signin" && currentUser && role === "admin") {
      next("/about");
    } else {
      next();
    }
  });

  axios.interceptors.response.use(null, (error) => {
    if (error.response.status == 401) {
      store.commit("logout"), router.push("'signin");
    }
  });
}
