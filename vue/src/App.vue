<template>
  <div>
    <!-- 青色背景/文字は白/中央揃え/文字はh4の形式/パディング3 -->
    <header class="bg-success text-white text-center h4 p-3">
      <img src="@/assets/PC.png" alt="木のイラスト" class="ml-2 header-img">
      学習用サイト

    </header>
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

<style scoped>
.nav-link.active {
  background-color: #004d40; 
}
  .header-img {
    width: 50px;
    height: auto;
    margin-left: 10px; 
  }

</style>




