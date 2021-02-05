import Vue from "vue";
import VueRouter from "vue-router";
import BookView from "../views/BookView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  },
  {
    path: "/book/:id",
    name: "Book",
    component: BookView
  },
  {
    path: "/book",
    name: "Book",
    component: BookView
  },
  {
    path: "/rent",
    name: "Rent",
    component: () =>
      import("../views/RentView.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () =>
      import("../views/UsersView.vue")
  },
    {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/RegisterView.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
