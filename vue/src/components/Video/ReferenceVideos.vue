<template>
  <div>
    <h2>参考動画</h2>

    <!-- リストの表示 -->
    <video-list @editSite="edit_site"></video-list>

    <!-- 新規追加ボタン -->
    <button @click="show_add_window">新規作成</button>

    <video-form v-if="show_window" @saveSite="save_site" @closeWindow="show_close_window"></video-form>
  </div>
  
</template>


<script>
import VideoList from './VideoList.vue';
import VideoForm from './VideoForm.vue';

export default{
  components: {
    VideoList,
    VideoForm
  },

  data(){
    return{
      show_window: false
    }
  },

  methods: {
    show_add_window(){
      this.show_window = true;
    },

    show_close_window(){
      this.show_window = false;
    },

    save_site(){
      this.show_window = false;
      console.log("a")
    },

    edit_site(){
      console.log("Editing site"); 
      this.show_window = true;
    }

  }


}




</script>

