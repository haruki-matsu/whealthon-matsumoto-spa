<template>
  <div class="table-responsive">
    
    <!-- ボタン群 -->
    <div class="d-flex justify-content-end mb-3">

      <!-- 完了タスク一覧表示ボタン -->
        <!-- <button class="btn btn-secondary me-2" @click=>完了タスク一覧</button> -->
      <!-- 新規作成フォーム表示ボタン -->
      <button class="btn btn-success" @click="openModal()">新規登録</button>
    </div>


    <!-- モーダルコンポーネント -->
    <div>
      <task-modal v-if="showModal" :initialTask="currentTask" @close="toggleModal('showModal', false)" @submit="addTask"></task-modal>
      <task-memo-modal v-if="showMemoModal" :initialMemo="currentMemo" @close="toggleModal('showMemoModal', false)" @update-memo="updateMemo"></task-memo-modal>
      <task-modal-done v-if="showCompleteModal" :initialTask="currentTask" @close="toggleModal('showCompleteModal', false)" @submit="completeTask"></task-modal-done>
      
    </div>

    <!-- タスクテーブル表示 -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="col-2">カテゴリー</th>
          <th class="col-4">タスク</th>
          <th class="col-2">期限</th>
          <th class="col-1">メモ</th>
          <th class="col-3">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" v-if="task && !task.completed" :key="task.name">
          <td class="col-2">
            <img :src="getImage(task.category)" alt="Category Image" style="width: 30px; height: auto;">
            {{ task.category || '-' }}
          </td>
          <td class="col-4">{{ task.name || '-' }}</td>
          <td class="col-2">{{ task.plannedEndDate || '-' }}</td>
          <td class="col-1">
            <button class="btn btn-secondary btn-sm m-1" @click="openMemoModal(task.memo, index)">メモ</button>
          </td>
          <td class="col-3">
            <button class="btn btn-primary btn-sm m-1" @click="openCompleteModal(task, index)">完了</button>
            <button class="btn btn-primary btn-sm m-1" @click="openModal(task, index)">変更</button>
            <button class="btn btn-danger btn-sm m-1" @click="deleteTask(index)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>

import TaskModal from './TaskModal.vue'; 
import TaskMemoModal from './TaskMemoModal.vue';
import TaskModalDone from './TaskModalDone.vue';

import WorkLogo from '@/assets/work_logo.png';
import LearnLogo from '@/assets/learn_logo.png';


export default {
  components: { TaskModal, TaskMemoModal, TaskModalDone},
  data() {
    return {
      tasks: [],
      task: {},
      showModal: false,
      showMemoModal: false,
      showCompleteModal: false,
      showCompletedModal: false,
      currentTask: null,
      currentIndex: -1,
      imagePaths: {
        業務: WorkLogo,
        学習: LearnLogo,
      },
      defaultImage: WorkLogo,
    };
  },
    created() {
    this.loadTasks();
  },
  methods: {
    // モーダルの表示状態を切り替える
    toggleModal(modalName, state) {
      this[modalName] = state;
    },

    // 新規登録またはタスク編集モーダルを開く
    openModal(task = null, index = -1) {
      this.currentTask = task ? { ...task } : { name: '',category:'', deadline: '',memo:'', completed: false };
      this.currentIndex = index;
      this.showModal = true;

    },
    // タスクを追加または更新
    addTask(task) {
      if (this.currentIndex === -1) {
        this.tasks.push({ ...task, completed: false });  
      } else {
        this.tasks[this.currentIndex] = { ...task, completed: false };
      }
      this.saveTasks();
      this.toggleModal('showModal', false);
    },

    // タスクを削除
    deleteTask(index) {
      if (confirm('このタスクを削除してもよろしいですか？')) {
        this.tasks.splice(index, 1);
        this.saveTasks();
      }
    },
    // タスクをローカルストレージに保存
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    // タスクをローカルストレージから読み込み
    loadTasks() {
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    },
    // メモモーダルを開く
    openMemoModal(memo, index) {
      this.currentMemo = memo;
      this.memoIndex = index;  // ここで memoIndex を設定
      this.showMemoModal = true;
    },

    // メモを更新
    updateMemo(updatedMemo) {
      this.tasks[this.memoIndex].memo = updatedMemo;
      this.saveTasks();
      this.toggleModal('showMemoModal', false);
    },

    // カテゴリーに応じた画像を取得
    getImage(category) {
      return this.imagePaths[category] || this.defaultImage;
    },
    // 完了モーダルを開く
    openCompleteModal(task, index) {
  this.currentTask = { ...task };
  this.currentIndex = index;
  this.showCompleteModal = true;
},

    // タスクを完了として記録
    completeTask(completedTask) {
      completedTask.completed = true;  
      this.tasks[this.currentIndex] = completedTask;  
      this.tasks = this.tasks.filter(task => !task.completed);  // バグが修正できたらはずす
      this.saveTasks();
      this.toggleModal('showCompleteModal', false);
    }
  }
}

</script>