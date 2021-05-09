<template>
  <div>
    <ScrollTop :threshold="150" />
    <div class="logo">
      <h1>Welcome to the Shavit Store</h1>
      <h2>Order today, get tomorrow!</h2>
    </div>

    <Products />
    <Footer />
  </div>
</template>

<script>
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default {
  components: { Products, Footer },
  setup() {}
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  color: white;
  margin: 0;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
}

.logo {
  position: relative;
  height: 90vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-image: linear-gradient(to right bottom, #000000b6, #5a5a5ac7),
    url("../assets/storeHeader.jpg");
  clip-path: polygon(0 0, 100% 0, 100% 65vh, 0 100%);
}
</style>
