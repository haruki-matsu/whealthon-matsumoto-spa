<template>
    <div class="table_container">
        <form @submit="data_submit">

            <!-- サイト名入力フィールド -->
            <label for="name">動画名:</label>
            <input id="name" v-model="video.name" required> 

            <!-- サイトURL入力フィールド -->
            <label for="url">動画URL:</label>
            <input id="url" v-model="video.url" required> 

            <!-- 動画視聴の目的入力フィールド -->
            <label for="purpose">動画を視聴する目的:</label>
            <input id="purpose" v-model="video.purpose" required>

            <!-- サイトの使用頻度入力フィールド -->
            <label for="frequency">使用頻度:</label>
            <select id="frequency" v-model="video.frequency" required>
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
  props: ['current_video'],
  data() {
    return {
      video: { ...this.current_video }
    };
  },

  methods: {
    //親コンポーネントにデータを送信
    data_submit() {
      this.$emit('saveVideo',this.video);  
    }
  },

  watch: { 
    current_video: { 
      handler(newVal) { 
        this.video = { ...newVal };
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

</style>

