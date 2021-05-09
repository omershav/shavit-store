<template>
  <div>
    <Toast position="bottom-center" />

    <form @submit.prevent="addProductToStock">
      <h2>Add products form</h2>

      <Fieldset legend="Fill the fields">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-4">
            <label for="title">Title</label>
            <InputText id="title" type="text" v-model="title" required />
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="price">Price</label>
            <InputNumber id="price" type="text" v-model="price" required />
          </div>
          <div class="p-field p-col-12 p-md-4">
            <label for="category">Category</label>
            <InputText id="category" type="text" v-model="category" required />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="description">Description</label>
            <InputText
              id="description"
              type="text"
              v-model="description"
              required
            />
          </div>
          <div class="p-field p-col-12 p-md-6">
            <label for="imageUrl">Image Url</label>
            <InputText id="imageUrl" type="text" v-model="imageUrl" required />
          </div>
        </div>

        <div>
          <button class="submitButton">
            Submit
          </button>
        </div>
      </Fieldset>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useState } from "../store/shoppingCart";
import { useToast } from "primevue/usetoast";

export default {
  setup() {
    const toast = useToast();
    let title = ref("");
    let price = ref(null);
    let category = ref("");
    let description = ref("");
    let imageUrl = ref("");
    let newProduct = reactive({});

    const { addProduct } = useState();

    const clearFields = () => {
      title.value = "";
      price.value = null;
      category.value = "";
      description.value = "";
      imageUrl.value = "";
    };

    const addSuccessToast = title => {
      toast.add({
        severity: "success",
        summary: "Congratulations!",
        detail: title + " has been added to the stock",
        life: 5000
      });
    };

    const addErrorToast = () => {
      toast.add({
        severity: "error",
        summary: "Error!",
        detail: "Invalid inputs",
        life: 5000
      });
    };

    const addProductToStock = () => {
      if (
        title.value &&
        price.value &&
        category.value &&
        description.value &&
        imageUrl.value
      ) {
        newProduct.title = title.value;
        newProduct.price = price.value;
        newProduct.category = category.value;
        newProduct.description = description.value;
        newProduct.imageUrl = imageUrl.value;

        addProduct(newProduct);
        addSuccessToast(title.value);
        clearFields();
      } else {
        addErrorToast();
      }
    };

    return {
      category,
      addProductToStock,
      title,
      price,
      description,
      imageUrl
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
  color: #555;
}

.submitButton {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-size: 20px;
}

.submitButton:hover {
  background-color: #002c6d;
}
</style>
