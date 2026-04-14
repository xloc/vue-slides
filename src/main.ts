import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { projects } from "./projects";
import "./style.css";

// Build routes from discovered slides
const routes = projects.flatMap((p) =>
  p.slides.map((s) => ({
    path: `/${p.name}/${s.name}`,
    component: s.component,
  })),
);

// Redirect root to last visited slide (stored in localStorage) or first slide
if (projects.length > 0) {
  const first = projects[0];
  const fallback = `/${first.name}/${first.slides[0].name}`;
  routes.push({
    path: "/",
    redirect: () => localStorage.getItem("last") || fallback,
  } as any);
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  if (to.path !== "/") localStorage.setItem("last", to.path);
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
