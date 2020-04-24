import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
    meta: {
      permissions: [
        {
          role: "admin",
          access: true,
          redirect: "SignIn",
        },
        {
          role: "student",
          access: false,
          redirect: "NoPermission",
        },
        {
          role: "inactive",
          access: false,
          redirect: "NoPermission",
        },
      ],
    },
  },

  {
    path: "/courses",
    name: "AddCourse",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AddCoursePage.vue"),
    meta: {
      permissions: [
        {
          role: "admin",
          access: true,
          redirect: "AddCourse",
        },
        {
          role: "instructor",
          access: true,
          redirect: "AddCourse",
        },
        {
          role: "student",
          access: false,
          redirect: "NoPermission",
        },
        {
          role: "inactive",
          access: false,
          redirect: "NoPermission",
        },
      ],
    },
  },

  {
    path: "/courses/:id",
    name: "ShowCourse",
    component: () => import("../views/CourseView.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },

  {
    path: "/error",
    name: "NoPermission",
    component: () => import("../views/NoPermission.vue"),
  },

  {
    path: "*",
    component: () => import("../views/ErrorPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
