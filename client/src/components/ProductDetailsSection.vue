<template>
  <div>
    <Toast position="bottom-center" />
    <div v-if="product">
      <Card class="cardStyle">
        <template #header>
          <img :alt="product.title" :src="product.image" />
        </template>
        <template #title>
          {{ product.title }}
        </template>
        <template #subtitle>
          <span style="font-weight:700;">
            {{ product.price ? "$" + product.price : "" }}
          </span>
        </template>
        <template #content>
          <div class="description">{{ product.description }}</div>
        </template>
        <template #footer>
          <div class="p-field p-col-12 p-md-3">
            <label for="quantity">Select quantity</label>
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
          </div>
          <Button
            icon="pi pi-plus"
            @click="addToCart"
            label="Add to Cart"
            iconPos="right"
            class="p-button-raised p-button-rounded p-button-warning p-button-sm"
          />
          <ToggleButton
            @change="changeWishList(product)"
            v-model="checked"
            onLabel="Remove from wishlish"
            offLabel="Add to wishlish"
            onIcon="pi pi-heart"
            offIcon="pi pi-heart"
            iconPos="right"
          />
          <div class="categories">Categories: {{ product.category }}</div>
        </template>
      </Card>
    </div>
    <div v-else>The product is not found</div>
  </div>
</template>

<script>
import { useState } from "../store/shoppingCart";
import { computed, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useWishList } from "../compositions/useWishList";
import { useAddToCart } from "../compositions/useAddToCart";

export default {
  props: {
    id: String
  },
  setup(props) {
    const toast = useToast();
    const quantity = ref(1);

    const product = computed(() => {
      if (state.products.length === 0) {
        return {
          _id: null,
          image: "",
          title: "",
          price: "",
          description: ""
        };
      }

      const prod = state.products.find(product => product._id === +props.id);
      if (!prod) {
        //Go to 404
        return;
      }

      return prod;
    });

    const { state, isProductExistInWish } = useState();
    const { checked, changeWishList } = useWishList(+props.id);

    const { addToShoppingCart } = useAddToCart();

    const addToCart = () => {
      addToShoppingCart(product.value, quantity.value > 0 ? quantity.value : 1);
      addSuccessToast(product.value.title);
    };

    const addSuccessToast = title => {
      toast.add({
        severity: "success",
        summary: "Congratulations!",
        detail: title + " has been added to your cart",
        life: 5000
      });
    };

    onMounted(() => {
      if (isProductExistInWish(+props.id)) checked.value = true;
    });

    return {
      quantity,
      changeWishList,
      checked,
      addToCart,
      state,
      product
    };
  }
};
</script>

<style scoped>
.cardStyle {
  width: 50%;
  margin: 20px auto;
  padding: 10px;
  text-align: left;
}

img {
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

button {
  margin: 0px 5px;
}

input {
  width: 50px;
}

.categories {
  margin: 25px 0 0 0;
}

@media only screen and (max-width: 1080px) {
  .cardStyle {
    text-align: center;
    width: 75%;
  }
  img {
    float: none;
    width: 25%;
  }

  button {
    margin: 5px;
  }
}
</style>
