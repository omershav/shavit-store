<template>
  <div>
    <DataTable
      :value="wishList"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="5"
    >
      <Column field="title" header="Product Title">
        <template #body="slotProps">
          <router-link :to="`/product/${slotProps.data._id}`">{{
            slotProps.data.title
          }}</router-link>
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps"> ${{ slotProps.data.price }} </template>
      </Column>
      <Column field="category" header="Category">
        <template #body="slotProps">
          {{ slotProps.data.category }}
        </template>
      </Column>
      <Column field="image" header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.title"
            width="50"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    wishList: Array
  },
  setup() {
    return {};
  }
};
</script>

<style scoped></style>
