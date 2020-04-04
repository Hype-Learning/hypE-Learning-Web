import axios from "axios"
export function initialize(store, router) {
    router.beforeEach((to, from, next) => {

        const requiredAuth = to.matched.some(record => record.meta.requiredAuth);
        const currentUser = store.state.currentUser;


        if (requiredAuth && !currentUser) {
            next('/signin');
        } else if (to.path == '/signin' && currentUser) {
            next('/about');
        } else {
            next();
        }

    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit("logout"),
                router.push("'signin");
        }

    })
}