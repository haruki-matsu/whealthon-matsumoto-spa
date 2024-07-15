<template>
  <!-- コンポーネント全体 -->
  <div>

     <!-- 新規登録ボタン：入力ドフォームの表示  -->
    <div class="d-flex justify-content-end mb-2 mt-2">
      <button class="btn btn-success" @click="openModal()">新規登録</button>
    </div>
    
    <!-- 入力フォームモーダル-->
    <reference-sites-modal v-if="showModal" :initialSite="currentSite" @close="showModal = false" @submit="addSite"></reference-sites-modal>

    <!-- カード形式でテーブルの内容を表示 -->
    <div class="row">
      <div class="col-6 col-sm-4 col-md-4 col-lg-3 mb-3" v-for="(site, index) in sites" :key="index">
        <div class="card h-100 border border-sucsess" @click="navigateTo(site.url)" style="cursor: pointer;">
          <img :src="getImage(site.category)" class="card-img-top" alt="Category Image">
          <div class="card-body custom-bg  d-flex flex-column">
            <h5 class="card-title text-left">{{ site.name || '-'}}</h5>
            <p class="card-text text-left">{{ site.contents || '-'}}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm me-1" @click.stop="openModal(site, index)">変更</button>
                <button class="btn btn-danger btn-sm " @click.stop="deleteSite(index)">削除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    navigateTo(url) {
    window.open(url, '_blank');
  }
    
  }
}
</script>


<style scoped>
.card-img-top {
  height: 75px;
  width: 100%;   
  object-fit: cover; 
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
}

.card-body .card-title,
.card-body .card-text {
  text-align: left !important; 
}

.h100{
  height:250px;
}
.mt-auto {
  margin-top: auto;
}

.card-title {
  font-size: 1rem; /* h5 のフォントサイズ */
}

.card-text {
  font-size: 0.8rem; /* p のフォントサイズ */
}

.custom-bg {
  background-image: url('@/assets/bg.jpeg');
  background-size: cover;
  background-position: center;
}

</style>
