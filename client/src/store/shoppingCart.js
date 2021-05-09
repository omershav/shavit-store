import { inject, reactive, readonly } from "vue";
import axios from "axios";
import { URL } from "@/services/config.js";

export const createState = () => {
  const state = reactive({
    orders: [],
    cartProducts: [],
    products: [],
    wishList: []
  });

  const fetchProducts = async () => {
    const res = await axios.get(URL + "products");
    state.products = res.data;
  };

  const fetchOrders = async () => {
    const res = await axios.get(URL + "orders");
    state.orders = res.data;
  };

  fetchProducts();
  fetchOrders();

  const changeShippingStatus = (id, newStatus) => {
    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i]._id === id) {
        state.orders[i].shippingStatus = newStatus;
        return;
      }
    }
  };

  const addProduct = async product => {
    await axios.post(URL + "products", {
      title: product.title,
      price: +product.price,
      description: product.description,
      category: product.category,
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
    });

    fetchProducts();
  };

  const calcCartProductsCount = () => {
    let count = 0;
    for (let i = 0; i < state.cartProducts.length; i++) {
      count += state.cartProducts[i].quantity;
    }

    return count;
  };

  const addQuantity = (id, quantity = 1) => {
    for (let i = 0; i < state.cartProducts.length; i++) {
      if (state.cartProducts[i]._id === +id) {
        state.cartProducts[i].quantity =
          state.cartProducts[i].quantity + quantity;
        return;
      }
    }
  };

  const checkIfProductInCart = id => {
    if (state.cartProducts.length > 0)
      for (let i = 0; i < state.cartProducts.length; i++) {
        if (state.cartProducts[i]._id === +id) {
          return true;
        }
      }
    return false;
  };

  const addProductToCart = (product, quantity = 1) => {
    state.cartProducts.push({
      _id: product._id,
      title: product.title,
      price: +product.price,
      category: product.category,
      image: product.image,
      quantity
    });
  };

  const checkProduct = id => {
    for (let i = 0; i < state.products.length; i++) {
      if (state.itemsInSale[i] === +id) return true;
    }
    return false;
  };

  const addOrder = async order => {
    await axios.post(URL + "orders", order);
    fetchOrders();
  };

  const isProductExistInWish = id => {
    return state.wishList.find(product => product._id === +id) ? true : false;
  };

  const addToWishList = product => {
    state.wishList.push(product);
  };

  const removeFromWishList = id => {
    state.wishList = state.wishList.filter(product => {
      return product._id !== +id;
    });
  };

  const clearCart = () => {
    state.cartProducts.splice(0);
  };

  return {
    calcCartProductsCount,
    changeShippingStatus,
    isProductExistInWish,
    removeFromWishList,
    addToWishList,
    clearCart,
    addQuantity,
    addOrder,
    checkIfProductInCart,
    fetchProducts,
    checkProduct,
    addProductToCart,
    addProduct,
    state: readonly(state)
  };
};

export const stateSymbol = Symbol("state");
export const useState = () => inject(stateSymbol);
