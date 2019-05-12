<template>
  <div class="home">
    <div class="container">
      <h1>Магазин разноцветных прямоугольников</h1>
    </div>

    <div class="gallery" v-if="all_data && all_data.length" :class="{load:loading}">
      <div class="gallery_item" v-for="(item, key) in all_data" :key="key">
        <div class="gallery_wrap">
          <div class="gallery_img" :style="{backgroundImage: `url(${item.url})`}"></div>
          <div class="gallery_info">
            <h4 class="gallery_title">{{ item.title }}</h4>
            <div class="price">{{ item.cost }} грн.</div>
            <button type="button" class="btn btn-success" @click="addToCart(item.id)">Купить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="!loading && !all_data.length">Nothing found</div>
    <div class="loading" v-if="loading"></div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  created() {
    this.fetchData();
  },
  computed: {
    all_data() {
      return this.$store.getters["tovar_list"];
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    async fetchData() {
      try {
        await this.$store.dispatch("fetchData");
      } catch (error) {
        console.log(error);
      }
    },
    addToCart(id) {
      let tovar = this.$store.getters["tovar_list"].find(tovar => {
        return tovar.id === id;
      });
      let is_update = false;

      this.$store.getters["cart_list"].forEach(cart_item => {
        if (tovar.id === cart_item.id) {
          this.$store.dispatch("updateCart", { id: tovar.id });
          is_update = true;
        }
      });
      if (is_update) return;

      this.$store.dispatch("addToCart", {
        ...tovar,
        quantity: 1
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/style/mixins.scss";
@import "../assets/style/components/gallery.scss";
</style>
