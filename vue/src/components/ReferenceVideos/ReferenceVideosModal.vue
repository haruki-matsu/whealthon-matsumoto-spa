<template>
   <!-- モーダルの全体構造 -->
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- モーダルヘッダー -->
        <div class="modal-header">
          <!-- タイトル（可変) -->
          <h5 class="modal-title">{{ initialVideo ? '動画情報編集' : '新規動画登録' }}</h5> 
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <!-- モーダル本体 -->
        <div class="modal-body">
          <!-- 動画名入力 -->
          <div class="mb-3">
            <label for="name" class="form-label text-left">動画名</label>
            <input type="text" class="form-control" id="name" placeholder="動画名" v-model="video.name">
            <div v-if="errors.name" class="text-danger text-left">{{ errors.name }}</div>
          </div>    
          <!-- URL入力 -->
          <div class="mb-3">
            <label for="url" class="form-label text-left">URL</label>
            <input type="text" class="form-control" id="url" placeholder="URL" v-model="video.url">
            <div v-if="errors.url" class="text-danger">{{ errors.url }}</div>
          </div>
          <!-- カテゴリー入力 -->
          <div class="mb-3">
            <label for="category" class="form-label text-left">カテゴリ</label>
            <select id="category" class="form-select" v-model="video.category">
              <option value="">選択してください</option>
              <option value="エンジニア全般">エンジニア全般</option>
              <option value="php">PHP</option>
              <option value="laravel">Laravel</option>
              <option value="vue">Vue</option>
              <option value="DB">DB</option>
              <option value="情報基礎">情報基礎</option>
              <option value="その他">その他</option>
            </select>
          </div>
          <!-- 動画の概要入力 -->
          <div class="mb-3">
            <label for="contents" class="form-label text-left">動画の概要</label>
            <input type="text" class="form-control" id="contents" placeholder="動画内容の説明" v-model="video.contents">
            <div v-if="errors.contents" class="text-danger">{{ errors.contents }}</div>
          </div>
        </div>
         <!-- モーダルのフッター -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="validateAndSubmit">登録</button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
     // 親コンポーネントから渡される動画データ
    initialVideo: { 
      type: Object,
      default: () => ({ category: '', name: '', url: '', contents: '', frequency: '' })
    }
  },
  data() {
    return {
      video: { ...this.initialVideo },  // 編集中の動画データ
      errors: {} // バリデーションのエラー情報
    };

  },
  methods: {
  // フォームのバリデーションと送信処理
  validateAndSubmit() {
    // エラー配列をリセット
    this.errors = {};
    // バリデーションの状態を追跡するフラグ
    let valid = true; 

    // 動画名のバリデーション(必須)
    if (!this.video.name) {
      this.errors.name = '動画名は必須です。';
      valid = false; // バリデーション失敗
    }else if (this.video.name.length > 10) {
      this.errors.name = '概要は10文字以下で入力してください。';
      valid = false;
    }

    // URLのバリデーション(YouTube動画)
    if (!this.video.url) {
      this.errors.url = 'URLは必須です。';
      valid = false;
    } else if (!/^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w\-_]+(&\S*)?$|^https:\/\/youtu\.be\/[\w\-_]+(\?\S*)?$/.test(this.video.url)) {
      this.errors.url = '有効なYouTube URLを入力してください。';
      valid = false;
    }

    // 動画概要のバリデーション(必須)
    if (!this.video.contents) {
      this.errors.contents = '動画の概要は必須です。';
      valid = false; // バリデーション失敗
    }else if (this.video.name.length > 20) {
      this.errors.name = '概要は20文字以下で入力してください。';
      valid = false;
    }

    // エラーがない場合にデータを送信
    if (valid) {
      this.$emit('submit', this.video);
      this.$emit('close');
    }
  }
}


  
}
</script>
