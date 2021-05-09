import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    props: true,
    component: function() {
      return import(
        /* webpackChunkName: "productDetails" */ "../views/ProductDetails.vue"
      );
    }
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: function() {
      return import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue");
    }
  },
  {
    path: "/orders",
    name: "Orders",
    component: function() {
      return import(/* webpackChunkName: "orders" */ "../views/Orders.vue");
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: function() {
      return import(/* webpackChunkName: "admin" */ "../views/Admin.vue");
    }
  },
  {
    path: "/wishlist",
    name: "WishList",
    component: function() {
      return import(/* webpackChunkName: "wishlist" */ "../views/WishList.vue");
    }
  },
  {
    path: "/success",
    name: "Success",
    component: function() {
      return import(/* webpackChunkName: "success" */ "../views/Success.vue");
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
