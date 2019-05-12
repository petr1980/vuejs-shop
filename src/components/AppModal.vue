<template>
  <transition name="fade">
    <div class="modal" tabindex="-1" role="dialog" v-if="is_open">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Спасибо за регистрацию</h5>
            <button type="button" class="close" data-dismiss="modal" @click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Теперь можно покупать наши цветные прямоугольники</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close()">Закрыть</button>
            <router-link class="btn btn-primary" :to="{name: 'HomePage'}">На главную</router-link>
          </div>
        </div>
      </div>
      <div class="mask" @click="close()"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    is_open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: block;
}
.modal-dialog {
  z-index: 10;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000, 0.6);
}
.modal-dialog {
  transition: transform 0.5s;
  transform: none;
}
.fade-enter,
.fade-leave-to {
  .modal-dialog {
    transform: translateY(-10%);
  }
}
</style>
