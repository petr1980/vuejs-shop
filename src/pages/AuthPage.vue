<template>
  <div class="container">
    <h1>Регистрация</h1>
    <form @submit.prevent="onSubmit()">
      <div class="form-group" :class="{error: errors.email}">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email">
        <small class="form-text">* Поле обязательно</small>
      </div>
      <div class="form-group" :class="{error: errors.pass}">
        <label>Пароль</label>
        <input type="password" class="form-control" v-model="pass">
        <small class="form-text">* Поле обязательно (не менее 6 символов)</small>
      </div>
      <div class="form-group" :class="{error: errors.confirm_pass}">
        <label>Подтвердить пароль</label>
        <input type="password" class="form-control" v-model="confirm_pass">
        <small class="form-text">* Поле обязательно (не менее 6 символов)</small>
      </div>
      <div class="form-group">
        <small class="form-text-hide" :class="{show: !checkPass}">Пароли не совпадают</small>
      </div>

      <button type="submit" class="btn btn-primary">Отправить</button>
    </form>

    <app-modal :is_open="open_modal" @close="closeModal"></app-modal>
  </div>
</template>

<script>
import AppModal from "@/components/AppModal";

export default {
  name: "AuthPage",

  components: { AppModal },

  data() {
    return {
      auth: false,
      open_modal: false,
      email: null,
      pass: null,
      confirm_pass: null,
      errors: {
        email: false,
        pass: false,
        confirm_pass: false
      }
    };
  },

  methods: {
    onSubmit() {
      this.errors.email = !this.validEmail;
      this.errors.pass = !this.validPass;
      this.errors.confirm_pass = !this.confirmValidPass;

      if (
        this.validEmail &&
        this.validPass &&
        this.confirmValidPass &&
        this.checkPass
      ) {
        this.open_modal = true;
        return true;
      }
    },

    closeModal(e) {
      this.open_modal = e;
    }
  },

  computed: {
    validEmail() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },
    validPass() {
      return this.pass && this.pass.length > 5;
    },
    confirmValidPass() {
      return this.confirm_pass && this.confirm_pass.length > 5;
    },
    checkPass() {
      return this.pass === this.confirm_pass;
    }
  },
  watch: {
    email(val, oldVal) {
      if (val !== oldVal) {
        this.errors.email = !this.validEmail;
      }
    },
    pass(val, oldVal) {
      if (val !== oldVal) {
        this.errors.pass = !this.validPass;
      }
    },
    confirm_pass(val, oldVal) {
      if (val !== oldVal) {
        this.errors.confirm_pass = !this.confirmValidPass;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  &.error {
    input {
      border-color: red;
    }
    .form-text {
      color: red;
    }
  }
  .form-text-hide {
    color: red;
    opacity: 0;
    transition: opacity 0.5s;
    &.show {
      opacity: 1;
    }
  }
}
</style>
