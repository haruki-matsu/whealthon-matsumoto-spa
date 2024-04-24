<template>
  <div id="app">
    <!-- ヘッダー -->
    <AppHeader class="header"/>

    <!-- ヘッダーの下に配置されるサイドバーとメインコンテンツ部分 -->
    <div class="content">
      <!-- サイドバー -->
      <AppSidebar class="sidebar"/>

      <!-- メインコンテンツ -->
      <router-view class="main_content"/>
    </div>
  </div>
</template>


<script>
// ヘッダーとサイドバーのコンポーネントのインポートとエクスポート
import AppHeader from './components/Header.vue';
import AppSidebar from './components/Sidebar.vue';

export default {
  components: {
    AppHeader,  
    AppSidebar 
  }
}
</script>


<style>
/* ヘッダー */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px; 
  text-align: center;
  background-color: #f3f3f3;
}

h1{
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  color: black;
  font-size: 2rem;

}


/* サイドバー */
.sidebar {
  position: fixed;
  top: 80px; 
  left: 0;
  width: 200px; 
  height: calc(100% - 80px); 
  background-color: #ddd;
  color: white;
  padding: 20px;
}

.sidebar a {
    display: block;
    margin: 10px 0;
}



/* メインコンテンツ */
.main_content{
  margin-top: 80px;
  margin-left: 210px; 
} 

h2{
  margin-left: 20px;
  margin-top: 100px;
}

table{
  margin-left: 40px;
}

</style>
