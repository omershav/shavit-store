<template>
  <div>
    <i class="pi pi-shopping-cart" style="fontSize: 2rem" v-badge="count"></i>
  </div>
</template>

<script>
export default {
  props: ["count"],
  data() {
    return {};
  }
};
</script>

<style scoped>
#productsCart {
  text-align: center;
  width: 25%;
  margin: 0 auto;
}
</style>
