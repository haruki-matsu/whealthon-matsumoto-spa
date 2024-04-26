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
            <tr>
          <td><button>GO</button></td>
          <td></td>
          <td></td>
          <td>
            <button>編集</button>
            <button>削除</button>
          </td>
        </tr>
          
        </tbody>
  
        </table>
      </div>
    </template>

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


</style>