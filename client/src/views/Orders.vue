<template>
  <div>
    <h1>Orders Page</h1>
    <OrdersTable :orders="state.orders" />
  </div>
</template>

<script>
import { useState } from "../store/shoppingCart";
import OrdersTable from "../components/OrdersTable";

export default {
  components: { OrdersTable },
  setup() {
    let { state } = useState();

    return {
      state
    };
  }
};
</script>

<style scoped></style>
