<template>
  <!-- モーダル全体 -->
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- モーダルのヘッダー -->
        <div class="modal-header">
          <h5 class="modal-title">タスク完了</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <!-- モーダルのボディ -->
        <div class="modal-body">

          <!-- タスク名入力 -->
          <div class="mb-3">
            <label for="taskName" class="form-label">タスク名</label>
            <input type="text" class="form-control" id="taskName" v-model="completedTask.name" readonly>
          </div>

          <!-- 完了後の所感 -->
          <div class="mb-3">
            <label for="thoughts" class="form-label">完了後の所感</label>
            <textarea class="form-control" id="thoughts" v-model="completedTask.thoughts"></textarea>
          </div>

          <!-- 見えてきた課題 -->
          <div class="mb-3">
            <label for="issues" class="form-label">見えてきた課題</label>
            <textarea class="form-control" id="issues" v-model="completedTask.issues"></textarea>
          </div>
        </div>

        <!-- モーダルフッター -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submit">登録</button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialTask: {
      type: Object,
      default: () => ({ name: '', thoughts: '', issues: '' })
    }
  },
  data() {
    return {
      completedTask: { ...this.initialTask }
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.completedTask);
      this.$emit('close');
    }
  }
}
</script>
