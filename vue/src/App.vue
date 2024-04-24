<template>
  <div id="app">
    <!-- ヘッダーコンポーネント -->
    <AppHeader class="header"/>

    <!-- ヘッダーの下に配置されるサイドバーとメインコンテンツ部分 -->
    <div class="content">
      <!-- サイドバー -->
      <AppSidebar class="sidebar"/>

      <!-- メインコンテンツ -->
      <router-view class="router-view"/>
    </div>
  </div>
</template>


<script>
// ヘッダーとサイドバーのコンポーネントをインポート
import AppHeader from './components/Header.vue';
import AppSidebar from './components/Sidebar.vue';

// Vue コンポーネントのオブジェクト定義とエクスポート
export default {
  components: {
    AppHeader,  
    AppSidebar 
  }
}
</script>


<style>
</style>
