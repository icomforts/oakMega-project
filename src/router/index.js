import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import { googleInit } from "@/plugins/google";
import { facebookInit } from "@/plugins/fb";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginView,
    },
    {
      path: "/map",
      name: "map",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/MapView.vue"),
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await googleInit();
    await facebookInit();
    if (
      authStore.loginState.facebook.status &&
      authStore.loginState.google.status
    ) {
      next();
    } else {
      alert("請先進行登入綁定");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
