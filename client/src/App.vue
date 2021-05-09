<template>
  <div id="app">
    <TabMenu :model="items" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        { label: "About", icon: "pi pi-fw pi-pencil", to: "/about" },
        {
          label: "Checkout",
          icon: "pi pi-fw pi-shopping-cart",
          to: "/checkout"
        },
        { label: "Wish List", icon: "pi pi-heart", to: "/wishlist" },
        { label: "Orders", icon: "pi pi-list", to: "/orders" },
        {
          label: "Admin",
          icon: "pi pi-users",
          to: "/admin"
        }
      ]
    };
  }
};
</script>
<style>
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  background-color: #efefef;
}
</style>
