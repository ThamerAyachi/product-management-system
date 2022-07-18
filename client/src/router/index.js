import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requireAuth: true },
    children: [{ path: "/", name: "Home", component: Home }],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        component: SignIn,
        name: "SignIn",
      },
      {
        path: "/register",
        component: SignUp,
        name: "SignUp",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.access_token) {
    next({ name: "SignIn" });
  } else if (store.state.access_token && to.meta.isGuest) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
