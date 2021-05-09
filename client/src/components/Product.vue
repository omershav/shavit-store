<template>
  <div class="p-col-12 p-sm-6 p-md-4 p-lg-3 p-shadow-1 container">
    <img :src="product.image" height="100" />

    <br />
    <br />

    <ToggleButton
      @change="changeWishList(product)"
      v-model="checked"
      onIcon="pi pi-heart"
      offIcon="pi pi-heart"
    />
    <div class="title">{{ product.title }}</div>
    <div class="price">${{ product.price }}</div>
    <br />
    <Button
      iconPos="right"
      icon="pi pi-plus"
      label="Add to cart"
      class="p-button-raised p-button-rounded p-button-warning p-button-sm"
      @click="addToCart()"
    />
    <br />
    <br />

    <Button
      icon="pi pi-eye"
      iconPos="right"
      label="Quick View"
      @click="openResponsive"
      class="p-button-raised p-button-rounded p-button-warning p-button-sm btnDetails"
    />
    <Button
      icon="pi pi-question-circle"
      iconPos="right"
      label="Show Details"
      @click="showDetails"
      class="p-button-raised p-button-rounded p-button-warning p-button-sm"
    />

    <Dialog
      :header="product.title"
      :visible="displayResponsive"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: '50vw', 'text-align': 'left' }"
      :modal="true"
    >
      <img class="dialogImage" :src="product.image" /><br />
      <div>Price: {{ product.price }}$</div>
      <p>Category: {{ product.category }}</p>
      <p>{{ product.description }}</p>
      <label for="quantity">Select quantity</label>
      <br />
      <InputNumber
        id="quantity"
        v-model="quantity"
        showButtons
        buttonLayout="horizontal"
        :step="1"
        decrementButtonClass="p-button-danger"
        incrementButtonClass="p-button-success"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
        :min="1"
        :max="100"
      />

      <template #footer>
        <Button
          label="Add to cart"
          icon="pi pi-plus"
          @click="addToCart"
          autofocus
          iconPos="right"
          class="p-button-raised p-button-rounded p-button-warning p-button-sm"
        />
        <Button
          label="Got it, thanks!"
          icon="pi pi-check"
          @click="closeResponsive"
          iconPos="right"
          class="p-button-raised p-button-rounded p-button-warning p-button-sm"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { useState } from "../store/shoppingCart";
import { computed, ref } from "vue";
import router from "../router/index";
import { useWishList } from "../compositions/useWishList";

export default {
  props: {
    product: Object
  },
  setup(props, context) {
    let displayResponsive = ref(false);
    let quantity = ref(1);

    const { checked, changeWishList } = useWishList(+props.product._id);

    let { state } = useState();

    const showDetails = () => {
      router.push({ path: `/product/${props.product._id}` });
    };

    const newDescription = computed(() => {
      return props.product.description.slice(0, 20);
    });

    const addToCart = () => {
      context.emit("add-to-cart", {
        productId: props.product._id,
        quantity: quantity.value
      });
    };

    const openResponsive = () => {
      displayResponsive.value = true;
    };
    const closeResponsive = () => {
      displayResponsive.value = false;
    };

    return {
      quantity,
      showDetails,
      changeWishList,
      newDescription,
      addToCart,
      openResponsive,
      closeResponsive,
      displayResponsive,
      checked,
      wishList: state.wishList
    };
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}

.container {
  text-align: center;
}

.dialogImage {
  float: right;
  width: 30%;
}

.p-togglebutton.p-button.p-highlight {
  background-color: red;
  border-color: red;
}

.p-togglebutton.p-button.p-highlight:hover,
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover {
  background-color: rgb(247, 38, 38);
}

.btnDetails {
  margin: 0px 5px 0px 0px;
}

.container {
  background-color: white;
}

.price,
.title {
  margin: 10px 0;
}
</style>
