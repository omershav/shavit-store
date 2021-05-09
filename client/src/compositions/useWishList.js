import { onMounted, ref } from "vue";
import { useState } from "../store/shoppingCart";

export function useWishList(id) {
  const checked = ref(false);

  const {
    isProductExistInWish,
    addToWishList,
    removeFromWishList
  } = useState();

  onMounted(() => {
    if (isProductExistInWish(+id)) checked.value = true;
  });

  const changeWishList = product => {
    if (checked.value) {
      addToWishList(product);
    } else {
      removeFromWishList(product._id);
    }
  };

  return { checked, changeWishList };
}
