<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="navbar-nav">
        <li v-for="page in pages" :key="page.route" class="nav-item" :class="page.class">
          <router-link class="nav-link" :to="{name: page.route}">
            <span v-if="page.class === 'cart'" class="cart_number">
              <span>{{ get_cart_list }}</span>
            </span>
            {{ page.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      pages: [
        {
          title: "Домой",
          route: "HomePage",
          class: ""
        },
        {
          title: "Регистрация",
          route: "AuthPage",
          class: ""
        },
        {
          title: "Корзина",
          route: "CartPage",
          class: "cart"
        }
      ]
    };
  },
  computed: {
    get_cart_list() {
      let quantity = 0;
      this.$store.getters["cart_list"].forEach(tovar => {
        quantity += +tovar.quantity;
      });
      return quantity;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/mixins.scss";
@import "../assets/style/components/header.scss";
</style>
