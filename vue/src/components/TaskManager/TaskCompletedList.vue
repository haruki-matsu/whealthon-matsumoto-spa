<template>
  <div class="modal" v-show="show">
    <div class="modal-content">
      <h3>完了したタスク</h3>
      <button @click="close">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    }
  },
}
</script>
