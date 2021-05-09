<template>
  <div>
    <h1>Congratulations!</h1>
    <p>
      Your order has been accepted, now you can track your shipping status on
      the
      <router-link to="/orders"> orders page </router-link>
    </p>
    <Button
      label="Back to homepage"
      icon="pi pi-fw pi-home"
      iconPos="left"
      class="p-button-lg"
      @click="backToHome"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
p {
  font-size: 1.5em;
}

a:link,
a:visited,
a:active {
  color: #2c3e50;
}

a:hover {
  color: #1c2835;
}
</style>
