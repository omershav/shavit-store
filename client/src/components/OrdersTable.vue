<template>
  <div>
    <DataTable
      :value="orders"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
    >
      <Column field="_id" header="Order id"></Column>
      <Column field="products" header="Products">
        <template #body="slotProps">
          <Dropdown
            :options="slotProps.data.products"
            optionLabel="title"
            placeholder="Watch products"
          />
        </template>
      </Column>
      <Column field="dateTime" header="Order date"></Column>
      <Column field="totalCost" header="Total price">
        <template #body="slotProps">
          ${{ slotProps.data.totalCost }}
        </template></Column
      >
      <Column field="address" header="Address"></Column>
      <Column field="city" header="City"></Column>
      <Column field="shippingMethod" header="Shipping Method"></Column>
      <Column field="shippingStatus" header="Shipping Status"></Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    orders: Array
  },
  setup() {
    return {};
  }
};
</script>

<style scoped></style>
