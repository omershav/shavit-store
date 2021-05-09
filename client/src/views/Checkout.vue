<template>
  <div>
    <h1>Checkout page</h1>
    <CartProductsTable
      :cartProducts="cartProd"
      :cartProductsCount="calcCartProductsCount()"
      :totalCartPrice="cartPrice"
    />
    <CheckoutForm
      @totalPrice="totalCartPrice"
      v-if="calcCartProductsCount() > 0"
    />
    <br />
  </div>
</template>

<script>
import CartProductsTable from "../components/CartProductsTable";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "../store/shoppingCart";
import { ref } from "vue";

export default {
  components: { CartProductsTable, CheckoutForm },
  setup() {
    let { state, calcCartProductsCount } = useState();

    let cartPrice = ref(0);

    const totalCartPrice = totalPrice => {
      cartPrice.value = totalPrice;
    };

    return {
      cartPrice,
      totalCartPrice,
      cartProd: state.cartProducts,
      calcCartProductsCount
    };
  }
};
</script>

<style scoped></style>
