<template>
  <div>
    <DataTable
      :value="orders"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="5"
    >
      <Column field="_id" header="Order Id"></Column>
      <Column field="userName" header="Username"></Column>
      <Column field="firstName" header="Firstname"></Column>
      <Column field="lastName" header="Lastname"></Column>
      <Column field="email" header="Email"> </Column>
      <Column field="address" header="Address"></Column>
      <Column field="city" header="City"></Column>
      <Column field="dateTime" header="Order date"></Column>
      <Column field="totalCost" header="Total price">
        <template #body="slotProps">
          ${{ slotProps.data.totalCost }}
        </template></Column
      >
      <Column field="shippingMethod" header="Shipping Method"></Column>
      <Column field="shippingStatus" header="Shipping Status">
        <template #body="slotProps">
          {{ slotProps.data.shippingStatus }}
          <Dropdown
            :options="shippingStatusOptions"
            v-model="selectedStatus"
            @change="changeStatus(slotProps.data._id)"
            placeholder="Change status"
          />
        </template>
      </Column>
      <Column field="products" header="Products">
        <template #body="slotProps">
          <Dropdown
            :options="slotProps.data.products"
            optionLabel="title"
            placeholder="Watch products"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    orders: Array
  },
  setup(props, context) {
    let shippingStatusOptions = ref(["Proccessing", "Delivering", "Delivered"]);
    let selectedStatus = ref();

    const changeStatus = id => {
      context.emit("change-status", {
        id,
        selectedStatus: selectedStatus.value
      });
    };

    return { shippingStatusOptions, selectedStatus, changeStatus };
  }
};
</script>

<style scoped></style>
