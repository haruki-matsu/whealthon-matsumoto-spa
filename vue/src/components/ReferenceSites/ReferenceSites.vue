<template>
  <!-- コンポーネント全体 -->
  <div class="table-responsive">

     <!-- 新規登録ボタン：入力ドフォームの表示  -->
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-success" @click="openModal()">新規登録</button>
    </div>
    
    <!-- 入力フォームモーダル-->
    <reference-sites-modal v-if="showModal" :initialSite="currentSite" @close="showModal = false" @submit="addSite"></reference-sites-modal>

    <!-- テーブル -->
    <table class="table table-hover table-bordered">
      <!-- テーブルヘッダー -->
      <thead>
        <tr>
          <th class="col-1"></th>
          <th class="col-3">サイト名</th>
          <th class="col-4">サイト概要</th>
          <th class="col-1">使用頻度</th>
          <th class="col-2"></th>
        </tr>
      </thead>
      <!-- テーブルボディー -->
      <tbody>
        <!-- sites配列をテーブルに挿入 -->
        <tr v-for="(site, index) in sites" :key="index">
          <!-- カテゴリ画像 -->
          <td class="col-1"> 
             <img :src="getImage(site.category)" alt="Category Image" style="width: 30px; height: auto;">
          </td>
          <!-- サイト名：クリックでサイトに飛ぶ -->
          <td class="col-3"><a :href="site.url" target="_blank">{{ site.name || '-'}}</a></td>
          <!-- サイト概要 -->
          <td class="col-4">{{ site.contents || '-'}}</td>
          <!-- 使用頻度 -->
          <td class="col-1">{{ site.frequency || '-'}}</td>
          <!-- 操作ボタン -->
          <td class="col-2">
            <!-- 変更ボタン(レコード毎)：入力フォームの表示/指定されたsiteの送信 -->
            <button class="btn btn-primary btn-sm m-1" @click="openModal(site, index)">変更</button>

            <!-- 削除ボタン(レコード毎)：指定されたsiteの削除-->
            <button class="btn btn-danger btn-sm m-1" @click="deleteSite(index)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//コンポーネントの読み込み
import ReferenceSitesModal from './ReferenceSitesModal.vue';
import VueLogo from '@/assets/Vue_logo.png';
import PhpLogo from '@/assets/PHP_logo.png';
import LaravelLogo from '@/assets/Laravel_logo.png';
import DBLogo from '@/assets/DB_logo.jpg';
import ZenpanLogo from '@/assets/zenpan_logo.jpg';
import KisoLogo from '@/assets/kiso_logo.jpg';
import OthersLogo from '@/assets/others_logo.jpg';

export default {
  // 子コンポーネントの登録
  components: { ReferenceSitesModal },

  // コンポーネントのデータ関数  
  data() {
    return {
      sites: [], //viudeoオブジェクトの配列
      showModal: false,  // モーダルウィンドウ表示のトリガー
      currentSite: null, // 編集中のsiteデータ
      currentIndex: -1, // 編集中のsiteの配列内インデックス
      imagePaths: {
        vue: VueLogo,
        php: PhpLogo,
        laravel: LaravelLogo,
        DB: DBLogo, 
        '情報基礎': KisoLogo, 
        'その他': OthersLogo, 
        'エンジニア全般': ZenpanLogo 
      },
      defaultImage: VueLogo,
    };
  },

  // コンポーネントが作成されたときに実行
  mounted() {
    this.loadSites();  
  },

  // メソッド定義部分
  methods: {

    // 入力用モーダルを開く処理
    openModal(site = null, index = -1) {
      //現在のデータをcurrentVideoにコピー（三項演算子）
      this.currentSite = site ? { ...site } : { category: '',name: '', url: '', contents: '' ,frequency:''};
      this.currentIndex = index;
      //モーダル表示(トリガー)
      this.showModal = true;
    },

     // サイトデータを追加、修正する処理
    addSite(site) {
      if (this.currentIndex === -1) {
        this.sites.push(site);
      } else {
        this.sites.splice(this.currentIndex, 1, site);
      }
      this.saveSites();  
      this.showModal = false;
    },

    // サイトデータを削除する処理
    deleteSite(index) {
      if (confirm('このサイトを削除してもよろしいですか？')) {
        this.sites.splice(index, 1);
        this.saveSites();  
      }
    },
    
    // 動画データをローカルストレージに保存する処理
    saveSites() {
      localStorage.setItem('sites', JSON.stringify(this.sites)); 
    },

    // ローカルストレージから動画データを読み込む処理
    loadSites() {
      const storedSites = localStorage.getItem('sites');
      if (storedSites) {
        this.sites = JSON.parse(storedSites);  
      }
    },

    // カテゴリに応じた画像を取得する処理
    getImage(category) {
      return this.imagePaths[category] || this.defaultImage;
    },
    
  }
}
</script>

