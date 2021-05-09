<template>
  <div>
    <Toast position="top-right" />

    <h1>Our products</h1>
    <hr />

    <Cart :count="calcCartProductsCount()" />

    <Fieldset legend="Sort" class="sortContainer">
      <SelectButton v-model="selectedSort" :options="sorts" />

      <div class="sliderContainer">
        Select price range:
        {{ value[0] + "-" + value[1] + "$" }} <br /><br />
        <Slider
          v-model="value"
          :range="true"
          :max="250"
          @change="filterProducts($event)"
        />
      </div>
    </Fieldset>

    <div class="p-flexgrid productsContainer">
      <div class="p-d-flex p-flex-wrap">
        <Product
          v-for="product in filteredProducts"
          :key="product._id"
          @add-to-cart="addToCart"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
import Product from "@/components/Product.vue";
import { useState } from "../store/shoppingCart";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useAddToCart } from "../compositions/useAddToCart";

export default {
  components: { Cart, Product },
  setup() {
    const toast = useToast();

    const value = ref([0, 250]);
    const minValue = ref(0);
    const maxValue = ref(100);

    const responsiveOptions = ref([
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: "600px",
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: "480px",
        numVisible: 1,
        numScroll: 1
      }
    ]);

    let selectedSort = ref("Our Favourites");
    let sorts = ref([
      "Our Favourites",
      "Price high to low",
      "Price low to high"
    ]);

    const { addToShoppingCart } = useAddToCart();

    const { state, calcCartProductsCount } = useState();

    const addToCart = productToAdd => {
      const product = state.products.find(
        product => product._id === productToAdd.productId
      );

      addToShoppingCart(product, productToAdd.quantity);
      addSuccessToast(product.title);
    };

    const addSuccessToast = title => {
      toast.add({
        severity: "success",
        summary: "Congratulations!",
        detail: title + " has been added to your cart",
        life: 5000
      });
    };

    const filterProducts = e => {
      minValue.value = e[0];
      maxValue.value = e[1];
    };

    const checkProduct = id => {
      for (let i = 0; i < state.itemsInSale.length; i++) {
        if (state.itemsInSale[i] === id) return true;
      }

      return false;
    };

    const filteredProducts = computed(() => {
      const sortedProducts = [...state.products];

      if (selectedSort.value === "Price high to low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (selectedSort.value === "Price low to high") {
        sortedProducts.sort((a, b) => a.price - b.price);
      }

      return sortedProducts.filter(
        product =>
          product.price >= minValue.value && product.price <= maxValue.value
      );
    });

    return {
      calcCartProductsCount,
      responsiveOptions,
      selectedSort,
      sorts,
      state,
      cartProducts: state.cartProducts,
      value,
      addToCart,
      filterProducts,
      checkProduct,
      filteredProducts
    };
  }
};
</script>

<style lang="scss" scoped>
.p-slider {
  width: 20rem;
  margin: 0 auto;
}

.timer,
.saleOver {
  font-size: 30px;
}

.productsContainer {
  margin: 20px;
}

.sliderContainer {
  margin: 20px 0;
}

fieldset {
  padding: 0;
  width: 50%;
  margin: 15px auto;
}

.p-message {
  margin: 0px 25%;
}

.product-item {
  .product-item-content {
    border: 1px solid var(--surface-d);
    border-radius: 3px;
    margin: 0.3rem;
    text-align: center;
    padding: 2rem 0;
    max-height: 250px;
  }

  .product-image {
    height: 150px;
  }
}
</style>
