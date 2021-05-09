<template>
  <div>
    <ProductDetailsSection :id="props.id" />
  </div>
</template>

<script>
import ProductDetailsSection from "../components/ProductDetailsSection";

export default {
  components: { ProductDetailsSection },
  props: {
    id: String
  },
  setup(props) {
    return {
      props
    };
  }
};
</script>

<style scoped></style>
