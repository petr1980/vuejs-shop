<template>
  <div class="cart">
    <div class="container">
      <h1>Корзина</h1>

      <div class="cart" v-if="all_data && all_data.length" :class="{load:loading}">
        <div class="cart_item" v-for="item in all_data" :key="item.id">
          <div class="cart_img" :style="{backgroundImage: `url(${item.url})`}"></div>
          <div class="cart_info">
            <h4 class="cart_title">{{ item.title }}</h4>

            <div class="cart_price">Цена: {{ item.cost }} грн.</div>
            <div class="cart_quantity">Количество: {{ item.quantity }}</div>

            <div class="btns-group">
              <button
                type="button"
                class="btn btn-success"
                @click="addRemoveToCart(item.id, 1)"
              >Больше</button>
              <button
                type="button"
                class="btn btn-warning"
                @click="addRemoveToCart(item.id, -1)"
                :disabled="item.quantity <=1"
              >Меньше</button>
              <button type="button" class="btn btn-danger" @click="deleteTovar(item.id)">Удалить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!loading && !all_data.length">В корзине нет прямоугольников</div>
      <div class="loading" v-if="loading"></div>

      <template v-if="all_data.length">
        <div class="cart_bottom">
          <div class="cart_total">Общая сумма заказа: {{ total }} грн.</div>

          <button type="button" class="btn btn-danger" @click="deleteAll()">Удалить все</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  created() {
    this.getCartData();
  },
  computed: {
    all_data() {
      return this.$store.getters["cart_list"];
    },
    loading() {
      return this.$store.getters.loading;
    },
    total() {
      let costs = this.$store.getters["cart_list"].map(item => {
        return item.cost * item.quantity;
      });
      return costs
        .reduce((a, b) => {
          return +a + +b;
        })
        .toFixed(2);
    }
  },
  methods: {
    async getCartData() {
      try {
        await this.$store.dispatch("getCartData");
      } catch (error) {
        console.log(error);
      }
    },
    addRemoveToCart(id, num) {
      this.$store.dispatch("updateCart", { id: id, num: num });
    },
    deleteTovar(id) {
      this.$store.dispatch("deleteTovar", id);
    },
    deleteAll() {
      this.$store.dispatch("deleteAll");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/style/mixins.scss";
@import "../assets/style/components/cart.scss";
</style>
