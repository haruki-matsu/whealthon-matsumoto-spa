<template>
  <div>
    <h2>参考動画</h2>

    <!-- リストの表示 -->
    <video-list :videos='videos' @editVideo="edit_video" @deleteVideo="delete_video"></video-list>

    <!-- 新規追加ボタン -->
    <button @click="show_add_window">新規作成</button>

    <video-form v-if="show_window" :current_video="current_video" @saveVideo="save_video" @closeWindow="show_close_window"></video-form>
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
      videos: JSON.parse(localStorage.getItem('videos') || '[]'),
      show_window: false

    }
  },

  methods: {
    // フォームの表示
    show_add_window(){
      this.show_window = true;
    },
    //フォームの非表示
    show_close_window(){
      this.show_window = false;
    },

    //新規作成、編集時完了時の処理
    save_video(video) {
    const index = this.videos.findIndex(v => v.name === video.name);
    if (index !== -1) {
        this.videos.splice(index, 1, video);
    } else {
        this.videos.push(video);
    }
    localStorage.setItem('videos', JSON.stringify(this.videos));
    this.show_close_window();
    },

    edit_video(index){
      this.show_window = true;
      this.current_video = { ...this.videos[index] };
    },

    delete_video(index) {
      this.videos.splice(index, 1);
      localStorage.setItem('videos', JSON.stringify(this.videos));
    },

  }
}
</script>

