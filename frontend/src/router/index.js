import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Survey from "../views/survey/Survey";
import NewSurvey from "../views/survey/newSurvey/NewSurvey";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/survey/add",
    name: "NewSurvey",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NewSurvey,
  },
  {
    path: "/survey/:slug",
    name: "Survey",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Survey,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
