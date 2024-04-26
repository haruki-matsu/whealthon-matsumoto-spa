<template>
    <div class="table_container">
        <form @submit="data_submit">

            <!-- サイト名入力フィールド -->
            <label for="name">動画名:</label>
            <input id="name" required> 

            <!-- サイトURL入力フィールド -->
            <label for="url">動画URL:</label>
            <input id="url" required> 

            <!-- 動画視聴の目的入力フィールド -->
            <label for="purpose">動画を視聴する目的:</label>
            <input id="purpose" required>

            <!-- サイトの使用頻度入力フィールド -->
            <label for="frequency">使用頻度:</label>
            <select id="frequency" required>
                <option value="頻繁">頻繁</option>
                <option value="普通">普通</option>
                <option value="稀">稀</option>
            </select>

            <!-- 送信ボタン -->
            <button type="submit">保存</button>

            <!-- キャンセルボタン-->
            <button @click="$emit('closeWindow')">キャンセル</button>

        </form>
    
    </div>
  </template>

<script>
export default {
  methods: {
    data_submit() {
      this.$emit('saveVideo');  
    }
  }
}
</script>





<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}

</style>

