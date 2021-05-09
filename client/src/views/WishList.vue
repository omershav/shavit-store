<template>
  <div>
    <h1>Wish Lish Page</h1>
    <WishListTable :wishList="state.wishList" />
  </div>
</template>

<script>
import { useState } from "../store/shoppingCart";
import WishListTable from "../components/WishListTable";

export default {
  components: { WishListTable },
  setup() {
    let { state } = useState();

    return {
      state
    };
  }
};
</script>

<style scoped></style>
