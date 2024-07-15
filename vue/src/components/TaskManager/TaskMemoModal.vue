<template>
   <!-- モーダルの全体構造 -->
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- モーダルのヘッダー -->
        <div class="modal-header">
          <h5 class="modal-title">メモの編集</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <!-- モーダルのボディ-->
        <div class="modal-body">

          <!-- メモ入力フォーム -->
          <textarea class="form-control" rows="5" v-model="memoContent"></textarea>
        </div>
        
        <!-- モーダルのフッター -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submit">保存</button>
          <button type="button" class="btn btn-secondary" @click="close">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['initialMemo'],
  data() {
    return {
      memoContent: this.initialMemo
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('update-memo', this.memoContent);
      this.close();
    }
  }
}
</script>
