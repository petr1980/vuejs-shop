<template>
  <div id="app">
    <the-header/>

    <transition name="route" mode="out-in" appear>
      <router-view/>
    </transition>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter
  }
};
</script>

<style lang="scss" src="@/assets/style/main.scss">
</style>