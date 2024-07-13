<template>
  <!-- モーダル全体 -->
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content bg-light">
        <!-- モーダルヘッダー -->
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditMode ? 'タスク編集' : '新規タスク登録' }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <!-- モーダルボディ -->
        <div class="modal-body">
          <!-- タスク名入力 -->
          <div class="mb-3">
            <label for="taskName" class="form-label">タスク名</label>
            <input type="text" class="form-control" id="taskName" placeholder="タスク名を入力" v-model="task.name">
            <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
          </div>
          <!-- カテゴリー選択 -->
          <div class="mb-3">
            <label for="category" class="form-label text-left">カテゴリー</label>
            <select id="category" class="form-select" v-model="task.category">
              <option value="">選択してください</option>
              <option value="業務">業務</option>
              <option value="学習">学習</option>
            </select>
            <div v-if="errors.category" class="text-danger">{{ errors.category }}</div>
          </div>
          <!-- 期限入力 -->
          <div class="mb-3">
            <label for="plannedEndDate" class="form-label">期限</label>
            <input type="date" class="form-control" id="plannedEndDate" v-model="task.plannedEndDate">
            <div v-if="errors.plannedEndDate" class="text-danger">{{ errors.plannedEndDate }}</div>
          </div>
        </div>
        <!-- モーダルフッター -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submit">登録</button>
          <button type="button" class="btn btn-secondary" @click="close">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  // コンポーネントに渡されるプロパティの定義
  props: {
    // taskオブジェクト
    initialTask: {
      type: Object,
      default: () => ({ name: '', janru: '', startDate: '', plannedEndDate: ''})
    },
    // 編集モードの状態or新規作成モード
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  // コンポーネントのローカルデータ
  data() {
    return {
      task: {}, // 現在のタスクデータを保持するオブジェクト
      errors: {}
    };
  },
  // コンポーネントがマウントされた後に実行されるライフサイクルフック
  mounted() {
    this.task = { ...this.initialTask };
  },
  methods: {
     // モーダルを閉じるイベントを親コンポーネントに通知
    close() {
      this.$emit('close');
    },
    // タスクのサブミットイベントを処理し、タスクデータを親コンポーネントに渡してからモーダルを閉じる
    submit() {
      this.validate();
      if (Object.keys(this.errors).length === 0) {
        this.$emit('submit', this.task);
        this.close();
      }
    },
    validate() {
      this.errors = {};
      if (!this.task.name) {
        this.errors.name = 'タスク名は必須です。';
      }
      if (!this.task.category) {
        this.errors.category = 'カテゴリーを選択してください。';
      }
      if (!this.task.plannedEndDate) {
        this.errors.plannedEndDate = '期限は必須です。';
      }
    }
  }
}
</script>

