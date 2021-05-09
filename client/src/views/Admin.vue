<template>
  <div>
    <h1>Admin page</h1>
    <AdminOrdersTable @change-status="changeStatus" :orders="state.orders" />
    <br />
    <br />
    <AddProductsForm />
  </div>
</template>

<script>
import AdminOrdersTable from "../components/AdminOrdersTable";
import AddProductsForm from "../components/AddProductsForm";
import { useState } from "../store/shoppingCart";

export default {
  components: { AdminOrdersTable, AddProductsForm },
  setup() {
    let { state, changeShippingStatus } = useState();

    const changeStatus = orderStatus => {
      console.log(orderStatus);
      changeShippingStatus(orderStatus.id, orderStatus.selectedStatus);
    };

    return { changeStatus, state };
  }
};
</script>

<style scoped></style>
