<template>
  <div>
    <!-- 青色背景/文字は白/中央揃え/文字はh4の形式/パディング3 -->
        <header class="bg-success-custom text-white h4 p-3 d-flex align-items-center justify-content-center position-relative">
      <router-link :to="{ name: 'TaskManager' }" class="position-relative z-index-1">
        <img src="@/assets/PC.png" alt="木のイラスト" class="ml-2 header-img">
      </router-link>
      <p class="mb-0 bordered-text position-relative z-index-1">学習用サイト</p>

      <!-- 電車の画像をヘッダーの上に配置 -->
      <div class="train-container">
        <img src="@/assets/train.png" alt="電車" class="train">
      </div>
    </header>

    <!-- ロードアップ時表示 -->
    <div class="blink" id="fadeElement">Welcome to the site!</div>

    <!-- コンテナ全幅使用/上マージン4 -->
    <div class="container-fluid mt-4">
      <!-- コンテナを横に配置(①ナビバー②メインコンテンツ) -->
      <div class="row">
        <!-- 左側のナビゲーションメニュー、12/2分割 -->
        <div class="col-md-2">
          <!-- 内部グループ化/縦に並べる/選択時の色変更/背景青/タブリストが並ぶことの説明/文字色白//タブリストが並ぶ説明-->
          <div class="nav flex-column nav-pills bg-success text-white" id="v-pills-tab" role="tablist">
            <!-- /tasksに飛ぶ//リンク/文字白// -->
            <router-link to="/tasks" class="nav-link text-white" role="tab" active-class="active">タスク管理</router-link>
            <!-- /sitesに飛ぶ -->
            <router-link to="/sites" class="nav-link text-white" role="tab" active-class="active">参考サイト</router-link>
            <!-- /videosに飛ぶ -->
            <router-link to="/videos" class="nav-link text-white" role="tab" active-class="active">参考動画</router-link>
            <!-- /videosに飛ぶ -->
            <router-link to="/design" class="nav-link text-white" role="tab" active-class="active">学習用</router-link>
          </div>
          <img src="@/assets/img_tree.jpg" alt="木のイラスト" class="img-fluid mt-3 d-none d-md-block">
        </div>
        <!-- メインコンテンツエリア -->
        <div class="col-md-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      const element = document.getElementById('fadeElement');
      if (element) {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s';
      }
    }, 4000);
  }
}
</script>

<style scoped>
/* アクティブなナビゲーションリンクのスタイル */
.nav-link.active {
  background-color: #004d40; 
}

/* ヘッダー画像のスタイル */
.header-img {
  width: 50px;
  height: auto;
  margin-left: 10px; 
}

/* ヘッダーの背景色 */
.bg-success-custom {
  background-color: #6cd96c; 
}

/* テキストにボーダー効果*/
.bordered-text {
  text-shadow: 
    -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px  1px 0 #000,
    1px  1px 0 #000; 
}

/* 点滅アニメーション */
.blink {
  animation: blink-animation 2s infinite; 
}

@keyframes blink-animation {
  0%, 100% { opacity: 0; } 
  50% { opacity: 1; } 
}

/* 電車のアニメーション */
.train-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; 
  overflow: hidden;
  z-index: 0;
}

.train {
  position: absolute;
  top: 20;
  height: 70px; 
  animation: trainMove 15s linear infinite;
  z-index: 0;
}

.z-index-1 {
  z-index: 1; 
}

@keyframes trainMove {
  0% {
    left: -100%; 
  }
  100% {
    left: 100%; 
  }
}
</style>



