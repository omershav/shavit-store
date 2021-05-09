<template>
  <div>
    <Toast position="bottom-center" />

    <form @submit.prevent="addOrderToStore">
      <Fieldset legend="Fill the fields">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="username">Username</label>
            <InputText id="username" type="text" v-model="userName" required />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="firstname">Firstname</label>
            <InputText
              id="firstname"
              type="text"
              v-model="firstName"
              required
            />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="lastname">Lastname</label>
            <InputText id="lastname" type="text" v-model="lastName" required />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="address">Address</label>
            <InputText id="address" type="text" v-model="address" required />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="city">City</label>
            <InputText id="city" type="text" v-model="city" required />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="email">Email</label>
            <InputText id="email" type="email" v-model="email" required />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="creditNumber">Credit Number</label>
            <InputNumber
              id="creditNumber"
              type="text"
              v-model="creditNumber"
              :useGrouping="false"
              required
            />
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="shipping">Shipping method</label>
            <Dropdown
              inputId="shipping"
              v-model="shippingMethod"
              :options="shippingMethods"
              placeholder="Select method"
            />
          </div>
        </div>

        <div class="submitSection">
          Total price includes shipping fee: ${{ totalPrice }}
          <br />
          <button class="buttonSubmit">
            Submit
          </button>
        </div>
      </Fieldset>
    </form>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useState } from "../store/shoppingCart";
import router from "../router/index";
import { useToast } from "primevue/usetoast";

export default {
  setup(props, { emit }) {
    const toast = useToast();
    const shippingMethods = ref(["Free shipping", "Fast shipping - 5$"]);
    const order = reactive({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      creditNumber: null,
      shippingMethod: "Free shipping"
    });

    let { addOrder, state, clearCart } = useState();

    const totalPrice = computed(() => {
      let sum = 0;
      for (const cartProduct of state.cartProducts) {
        sum += cartProduct.price * cartProduct.quantity;
      }

      let priceCalculated =
        +sum.toFixed(2) +
        (order.shippingMethod === "Fast shipping - 5$" ? 5 : 0);
      emit("totalPrice", priceCalculated);

      return priceCalculated;
    });

    const addErrorToast = () => {
      toast.add({
        severity: "error",
        summary: "Error!",
        detail: "Invalid inputs",
        life: 5000
      });
    };

    const addOrderToStore = () => {
      if (
        order.userName &&
        order.firstName &&
        order.lastName &&
        order.email &&
        order.address &&
        order.city &&
        order.creditNumber
      ) {
        const date = new Date();
        order._id = state.orders.length + 1;
        order.dateTime = `${date.toLocaleString()}`;
        order.products = [...state.cartProducts];
        order.totalCost = totalPrice.value;
        order.shippingStatus = "Proccessing";

        addOrder(order);
        clearCart();
        router.push("Success");
      } else {
        addErrorToast();
      }
    };

    return {
      totalPrice,
      shippingMethods,
      cartProducts: state.cartProducts,
      addOrderToStore,
      ...toRefs(order)
    };
  }
};
</script>

<style scoped>
form {
  max-width: 75%;
  margin: 30px auto;
  background: #dbdbdb;
  text-align: center;
  padding: 40px;
  border-radius: 10px;
}

label {
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
}

.buttonSubmit {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-size: 20px;
}

.buttonSubmit:hover {
  background-color: #002c6d;
}

.submitSection {
  text-align: center;
  font-weight: 700;
}
</style>
