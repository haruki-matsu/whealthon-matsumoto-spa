<!-- サイトの一覧をテーブル形式で表示するコンポーネント-->


<template>
  <div class="table_container">
    <table>
      <thead>
        <!-- テーブルの項目 -->
        <tr>
          <th></th>
          <th>画像</th>
          <th>サイト名</th>
          <th>使用目的</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- サイトのデータを動的にリスト表示 -->
        <tr v-for="(site, index) in sites" :key="index"
            :class="getFrequencyClass(site.frequency)">
          <td><button @click="redirectTo(site.url)">GO</button></td>
          <td>
            <img v-if="site.image" :src="site.image" alt="Site Image" style="max-width: 100%; height: auto;">
            <img v-else :src="require('@/assets/images/def_img.png')" alt="Default Image" style="max-width: 100%; height: auto;">
          </td>
          <td>{{ site.name }}</td>
          <td>{{ site.purpose }}</td>
          <td>
            <button @click="$emit('editSite', index)">編集</button>
            <button @click="$emit('deleteSite', index)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  // RefrenceSitesデータの受け取り
  props: ['sites'], 
  
  methods: {

    // 使用頻度によって、その行の背景を変えるメゾット
    getFrequencyClass(frequency) {
      switch(frequency) {
        case '頻繁': return 'frequency-frequent';
        case '普通': return 'frequency-normal';
        case '稀': return 'frequency-rare';
        default: return '';
      }
    },
    // URLにリダイレクトするメソッド
    redirectTo(url) {
      if(url) { 
        window.location.href = url; 
      }
    }
  }
}
</script>



<style>
.table_container {
  overflow-x: auto; 
  margin: 20px
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc; 
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid rgb(147, 143, 143); 
}

th{
  text-align: center;
}

th:nth-child(1), td:nth-child(1) { width: 10%; } 
th:nth-child(2), td:nth-child(2) { width: 10%; }
th:nth-child(3), td:nth-child(3) { width: 15%; } 
th:nth-child(4), td:nth-child(4) { width: 30%; } 
th:nth-child(5), td:nth-child(5) { width: 20%; } 

/* 使用 */
.frequency-frequent {
  background-color: #f97b7b; 
}

.frequency-normal {
  background-color: #fea3a3; 
}

.frequency-rare {
  background-color: #f9dcdc; 
}

</style>
