import { useState } from "../store/shoppingCart";

export function useAddToCart() {
  const { addProductToCart, checkIfProductInCart, addQuantity } = useState();

  const addToShoppingCart = (product, quantity) => {
    if (checkIfProductInCart(product._id)) addQuantity(product._id, quantity);
    else addProductToCart(product, quantity);
  };

  return { addToShoppingCart };
}
