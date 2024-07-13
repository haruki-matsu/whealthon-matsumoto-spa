<template>
  <!-- コンポーネント全体 -->
  <div class="table-responsive">

    <!-- iframe(指定動画の表示) -->
    <div v-if="selectedUrl" class="video-player position-relative" style="width: 560px; height: 315px; margin: 0 auto;">
      <iframe :src="selectedUrl" width="560" height="315" frameborder="0" allowfullscreen></iframe>
      <button @click="closeVideo" class="btn btn-danger position-absolute top-0 end-0">×</button>
    </div>

    <!-- 新規登録ボタン：入力ドフォームの表示  -->
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-success" @click="openModal()">新規登録</button>
    </div>

    <!-- 入力フォームモーダル-->
    <reference-videos-modal v-if="showModal" :initialVideo="currentVideo" @close="showModal = false" @submit="addVideo"></reference-videos-modal>

    <!-- テーブル -->
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th class="col-1"></th>
          <th class="col-3">動画名</th>
          <th class="col-4">動画概要</th>
          <th class="col-1">使用頻度</th>
          <th class="col-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(video, index) in videos" :key="index">
          <!-- シンボル画像 -->
          <td class="col-1">
            <img :src="getImage(video.category)" alt="Category Image" style="width: 30px; height: auto;">
          </td>
          <!-- 動画名：クリックでiframe表示 -->
          <td class="col-3"><a @click.prevent="selectVideo(video.url)" href="#">{{ video.name || "-"}}</a></td>
          <!-- 動画説明 -->
          <td class="col-4">{{ video.contents ||"-"}}</td>
          <!-- 頻度 -->
          <td class="col-1">{{ video.frequency ||"-"}}</td>
          <!-- 操作ボタン -->
          <td class="col-2">
            <button class="btn btn-primary btn-sm m-1" @click="openModal(video, index)">変更</button>
            <button class="btn btn-danger btn-sm m-1" @click="deleteVideo(index)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

// モーダルコンポーネントと画像の読み込み
import ReferenceVideosModal from './ReferenceVideosModal.vue';
import VueLogo from '@/assets/Vue_logo.png';
import PhpLogo from '@/assets/PHP_logo.png';
import LaravelLogo from '@/assets/Laravel_logo.png';
import DBLogo from '@/assets/DB_logo.jpg';
import ZenpanLogo from '@/assets/zenpan_logo.jpg';
import KisoLogo from '@/assets/kiso_logo.jpg';
import OthersLogo from '@/assets/others_logo.jpg';

export default {
  // モーダルコンポーネントと登録
  components: { ReferenceVideosModal },
  data() {
    return {
      videos: [], // 動画データの配列
      showModal: false, //モーダル表示状態
      currentVideo: null, // 現在選択中の動画オブジェクト
      currentIndex: -1,
      selectedUrl: null,  // iframeで表示するURL
      imagePaths: { // 各カテゴリに対応する画像パス
        vue: VueLogo,
        php: PhpLogo,
        laravel: LaravelLogo,
        DB: DBLogo,
        情報基礎: KisoLogo ,
        その他: OthersLogo,
        エンジニア全般: ZenpanLogo ,
      },
      defaultImage: VueLogo, // デフォルトの画像
    };
  },
  // マウントした後にデータを読み込む
  mounted() {
    this.loadVideos();
  },
  
  methods: {
   // 入力用モーダルを開く処理
      openModal(video = null, index = -1) {
      this.currentVideo = video ? { ...video } : { category: '', name: '', url: '', contents: '', frequency: '' };
      this.currentIndex = index; // currentIndexを設定
      this.showModal = true;
   },


    // 動画を追加または更新する処理
    addVideo(video) {
      if (this.currentIndex === -1) {
        // 新規登録の場合、配列の末尾に追加
        this.videos.push(video);
      } else {
        // 既存のデータを更新
        this.videos.splice(this.currentIndex, 1, video);
      }
      this.saveVideos();
      this.showModal = false;
      this.currentIndex = -1; // currentIndexをリセット
    },

    

    // 動画データを削除する処理
    deleteVideo(index) {
      this.videos.splice(index, 1);
      this.saveVideos();
    },
    // 動画を選択する処理
    selectVideo(url) {
      const videoId = new URL(url).searchParams.get('v');
      this.selectedUrl = `https://www.youtube.com/embed/${videoId}`;
    },
    // 動画表示を閉じる処理
    closeVideo() {
      this.selectedUrl = null;
    },
    // 動画データをローカルストレージに保存する処理
    saveVideos() {
      localStorage.setItem('videos', JSON.stringify(this.videos));
    },
    // ローカルストレージから動画データを読み込む処理
    loadVideos() {
      const storedVideos = localStorage.getItem('videos');
      this.videos = storedVideos ? JSON.parse(storedVideos) : [];
    },
    // カテゴリに応じた画像を取得する処理
    getImage(category) {
      return this.imagePaths[category] || this.defaultImage;
    }
  },
}
</script>
