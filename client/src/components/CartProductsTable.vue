<template>
  <div>
    <DataTable
      :value="cartProducts"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="5"
    >
      <Column field="title" header="Product title">
        <template #body="slotProps">
          <router-link :to="`/product/${slotProps.data._id}`">{{
            slotProps.data.title
          }}</router-link>
        </template></Column
      >
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.image"
            class="product-image"
          />
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps"> ${{ slotProps.data.price }} </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slotProps">
          {{ slotProps.data.quantity }}
        </template>
      </Column>
      <Column field="total" header="Total price">
        <template #body="slotProps">
          ${{ (slotProps.data.quantity * slotProps.data.price).toFixed(2) }}
        </template>
      </Column>

      <template #footer>
        Subtotal: <br />
        <span v-if="cartProductsCount > 1"
          >There are {{ cartProductsCount }} products in your cart</span
        >
        <span v-else-if="cartProductsCount === 1"
          >{{ "There is " + cartProductsCount + " product" }} in your cart</span
        >
        <span v-else>Your cart is empty</span>
        <br />
        Total price: {{ "$" + totalCartPrice }}
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    cartProducts: Array,
    cartProductsCount: Number,
    totalCartPrice: Number
  },
  setup() {
    return {};
  }
};
</script>

<style scoped>
img {
  width: 50px;
}
</style>
