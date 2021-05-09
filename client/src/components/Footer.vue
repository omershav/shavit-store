<template>
  <div class="footer">
    <div class="header">Shavit Store 2021 - the best shop in town</div>
    <br />
    <div class="icons">
      <Button
        icon="pi pi-facebook icon"
        class="p-button-raised p-button-rounded p-button-lg icon"
      />
      <Button
        icon="pi pi-twitter icon"
        class="p-button-raised p-button-rounded p-button-lg icon"
      />
      <Button
        icon="pi pi-google icon"
        class="p-button-raised p-button-rounded p-button-lg icon"
      />
      <Button
        icon="pi pi-github icon"
        class="p-button-raised p-button-rounded p-button-lg icon"
      />
      <Button
        icon="pi pi-youtube icon"
        class="p-button-raised p-button-rounded p-button-lg icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(192, 192, 192);
  margin: 0;
  height: 25vh;
  border-top: 2px #a0a0a0 solid;
}

.header {
  font-size: 2rem;
  font-weight: 700;
}

.icon {
  font-size: 2rem;
  margin: 0 5px;
}

@media only screen and (max-width: 1080px) {
  .header {
    font-size: 1.5rem;
  }
}
</style>
