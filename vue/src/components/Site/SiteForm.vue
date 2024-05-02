<!-- 新規サイトの追加や既存サイトの編集を行うフォームを提供するコンポーネント -->


<template>
  <div class="window">
    <!-- フォーム送信時にhandleSubmitメソッドを呼び出し、ページのリロードを防ぐ -->
    <form @submit="data_submit">

      <!-- サイト名入力フィールド -->
      <label for="name">サイト名:</label>
      <input id="name" v-model="site.name" required> 
      
       <!-- サイトURL入力フィールド -->
      <label for="url">サイトURL:</label>
      <input id="url" v-model="site.url" required>
      

      <!-- 画像ファイル入力フィールド -->
      <label for="image">サイト用の画像:</label>
      <input id="image" type="file" @change="image_change" >


      <!-- サイト目的入力フィールド -->
      <label for="purpose">サイトを使用する目的:</label>
      <input id="purpose" v-model="site.purpose" required>

      <!-- サイトの使用頻度入力フィールド -->
      <label for="frequency">使用頻度:</label>
      <select id="frequency" v-model="site.frequency" required>
        <option value="頻繁">頻繁</option>
        <option value="普通">普通</option>
        <option value="稀">稀</option>
      </select>

      <!-- 保存ボタン -->
      <button type="submit">保存</button>

      <!-- キャンセルボタン-->
      <button @click="$emit('closeWindow')">キャンセル</button>
    </form>
  </div>
</template>


<script>
export default {
  ////ReferenceSitesから現在のデータをもらい、ローカルにコピー
  props: ['current_site'], 
  data() {
    return {
      site: { ...this.current_site }
    };
  },
  methods: {

    //画像url作成
    image_change(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.site.image = URL.createObjectURL(file);
    }
  },
    //データの送信の際にReferenceSitesにイベント発火して、データの送信
    data_submit() {
      this.$emit('saveSite', this.site);
    }
  },

  //ローカルのデータを更新
  watch: { 
    current_site: { 
      handler(newVal) { 
        this.site = { ...newVal };
      },
      immediate: true
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

input[type="text"],
input[type="url"],
input[type="file"],
select {
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  padding: 8px;
  color: #333; 
  cursor: pointer; 
}

input[type="file"]:hover {
  background-color: #f4f4f4; 
}

</style>

