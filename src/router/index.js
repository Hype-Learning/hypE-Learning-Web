import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    // meta: {
    //   requiresAuth: true,
    //   roles: ["instructor", "admin", "student"],
    // },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin"],
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
      requiresAuth: true,
      roles: ["instructor", "admin"],
    },
  },

  {
    path: "/courses/:id",
    name: "ShowCourse",
    component: () => import("../views/CourseView.vue"),
    meta: {
      requiresAuth: true,
      roles: ["instructor", "admin", "student"],
    },
  },

  {
    path: "/edit/courses/:id",
    name: "EditCourse",
    component: () => import("../components/EditCourse.vue"),
    meta: {
      requiresAuth: true,
      roles: ["instructor", "admin"],
    },
  },

  {
    path: "/courses/:id/participants",
    name: "AddParticipants",
    component: () => import("../components/AddParticipants.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin", "instructor"],
    },
  },

  {
    path: "/profile",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
    meta: {
      requiresAuth: true,
      roles: ["instructor", "admin", "student"],
    },
  },

  {
    path: "/profile/edit",
    name: "EditProfile",
    component: () => import("../components/EditProfile.vue"),
    meta: {
      requiresAuth: true,
      roles: ["instructor", "admin", "student"],
    },
  },

  {
    path: "/users/management",
    name: "UserManagement",
    component: () => import("../components/UserManagement.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },

  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
    meta: {
      requiresAuth: false,
    },
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
    name: "ErrorPage",
    component: () => import("../views/ErrorPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
