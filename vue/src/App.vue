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

button {
  cursor: pointer;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #5C67F2;
  color: white;
  transition: background-color 0.3s;

}

button:hover {
  background-color: #4a54e1;
}

.window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

</style>
