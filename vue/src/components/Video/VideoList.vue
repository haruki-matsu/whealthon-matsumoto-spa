<template>
    <div class="table_container">
      <table>
        <thead>
          <!-- テーブルの項目 -->
          <tr>
            <th></th>
            <th>動画名</th>
            <th>内容</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(video, index) in videos" :key="index"
          :class="getFrequencyClass(video.frequency)">
            <td><button>GO</button></td>
            <td>{{ video.name }}</td>
            <td>{{ video.purpose }}</td>
            <td>
              <button @click="$emit('editVideo',index)">編集</button>
              <button @click="$emit('deleteVideo', index)">削除</button>
            </td>
        </tr>
        </tbody>
  
      </table>
    </div>
</template>

<script>
export default {
  props: ['videos'], 

  methods: {
// 使用頻度によって、その行の背景を変えるメゾット
  getFrequencyClass(frequency) {
    switch(frequency) {
      case '頻繁': return 'frequency-frequent';
      case '普通': return 'frequency-normal';
      case '稀': return 'frequency-rare';
      default: return '';
      }
  }}
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
th:nth-child(2), td:nth-child(2) { width: 15%; }
th:nth-child(3), td:nth-child(3) { width: 30%; } 
th:nth-child(4), td:nth-child(4) { width: 15%; } 

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