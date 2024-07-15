<template>
   <!-- モーダルの全体構造 -->
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog border">
      <div class="modal-content">
        <!-- モーダルヘッダー -->
        <div class="modal-header">
          <h5 class="modal-title">{{ initialSite ? 'サイト情報編集' : '新規サイト登録' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <!-- モーダル本体 -->
        <div class="modal-body">
          <!-- サイト名入力 -->
          <div class="mb-3">
            <label for="siteName" class="form-label text-start">サイト名</label>
            <input type="text" class="form-control" id="siteName" placeholder="サイト名を入力" v-model="site.name">
            <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
          </div>
          <!-- サイトURL -->
          <div class="mb-3">
            <label for="siteUrl" class="form-label text-start">URL</label>
            <input type="text" class="form-control" id="siteUrl" placeholder="URLを入力" v-model="site.url">
            <div v-if="errors.url" class="text-danger">{{ errors.url }}</div>
          </div>
          <!-- カテゴリー -->
          <div class="mb-3">
            <label for="category" class="form-label text-start">カテゴリ</label>
            <select id="category" class="form-select" v-model="site.category">
              <option value="">選択してください</option>
              <option value="エンジニア全般">エンジニア全般</option>
              <option value="php">PHP</option>
              <option value="laravel">Laravel</option>
              <option value="vue">Vue</option>
              <option value="DB">DB</option>
              <option value="情報基礎">情報基礎</option>
              <option value="その他">その他</option>
            </select>
            <div v-if="errors.category" class="text-danger">{{ errors.category }}</div>
          </div>
          <!-- サイト内容 -->
          <div class="mb-3">
            <label for="siteUsage" class="form-label text-start">サイト内容</label>
            <input type="text" class="form-control" id="siteUsage" placeholder="サイト内容を入力" v-model="site.contents">
            <div v-if="errors.contents" class="text-danger">{{ errors.contents }}</div>
          </div>
        </div>
        <!-- モーダルフッター -->
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
    // 親コンポーネントから渡されるサイトデータ
    initialSite: {
      type: Object,
      default: () => ({ category: '', name: '', url: '', contents: '',})
    }
  },
  data() {
    return {
      site: { ...this.initialSite },  // 編集中のサイトデータ
      errors: {}  // バリデーションのエラー情報
    };
  },
  methods: {
  // フォームのバリデーションと送信処理
  validateAndSubmit() {
    // エラー配列をリセット
    this.errors = {};
    let valid = true; // バリデーションの状態を追跡するフラグ

    // サイト名のバリデーション(必須)
    if (!this.site.name) {
      this.errors.name = 'サイト名は必須です。';
      valid = false;
      } else if (this.site.name.length > 10) {
        this.errors.name = 'サイト名は10文字以下で入力してください。';
        valid = false;
    }
    // URLのバリデーション(正しいフォーマット)
    if (!this.site.url) {
      this.errors.url = 'URLは必須です。';
      valid = false;
    } else if (!/^https:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.site.url)) {
      this.errors.url = '有効なURLを入力してください。';
      valid = false;
    }
    // カテゴリのバリデーション(必須)
    if (!this.site.category) {
      this.errors.category = 'カテゴリは必須です。';
      valid = false;
    }
    // サイト内容のバリデーション(必須)
    if (!this.site.contents) {
      this.errors.contents = 'サイト内容は必須です。';
      valid = false;
    } else if (this.site.name.length > 20) {
      this.errors.name = '概要は20文字以下で入力してください。';
      valid = false;
    }

    // バリデーションが全て通ればデータを送信
    if (valid) {
      this.$emit('submit', this.site);
      this.$emit('close');
    }
  }


}
}
</script>

