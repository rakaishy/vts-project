import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    // redirect: "/home",
    redirect: { name: "home" },
  },
  {
    path: "/home",
    name: "home",
    //component: PostView, // TODO: Carga normal
    component: () =>
      // TODO: Carga perezosa
      import(
        /* webpackChunkName: "PostView"*/ "../modules/posts/views/PostView"
      ),
  },
  {
    path: "/post-detail/:id",
    name: "post-detail",
    component: () =>
      // TODO: Carga perezosa
      import(
        /* webpackChunkName: "PostDetail"*/ "../modules/posts/views/PostDetailView"
      ),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: import(
      /* webpackChunkName: "NoFoundView"*/ "@/modules/shared/views/NoFoundView"
    ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
