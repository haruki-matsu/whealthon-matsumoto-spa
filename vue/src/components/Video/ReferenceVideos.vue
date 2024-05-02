<template>
  <div>
    <h2>参考動画</h2>

    <!-- リストの表示 -->
    <video-list :videos='videos' @editVideo="edit_video" @deleteVideo="delete_video" @playVideo="play_video"></video-list>

    <!-- 新規追加ボタン -->
    <button @click="show_add_window">新規作成</button>

    <!-- フォームウインドウ(初期非表示) -->
    <video-form v-if="show_window" :current_video="current_video" @saveVideo="save_video" @closeWindow="show_close_window" ></video-form>

    <!-- iframeでの動画表示(初期非表示) -->
    <div v-if="show_video" class="video-container">
      <iframe :src="currentVideoUrl" width="560" height="315"></iframe>
      <button @click="close_video">動画を閉じる</button>
    </div>

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
      show_window: false,
      show_video: false,
      currentVideoUrl: '', 
      current_video: null
    }
  },

  methods: {

    // フォームの表示
    show_add_window(){
      this.current_video = { name: '', url: '', purpose: '', frequency: '' };
      this.show_window = true;
    },
    //フォームの非表示
    show_close_window(){
      this.show_window = false;
    },

      //データの新規登録、更新
      save_video(video) {
      if (this.current_video && this.videos.some(s => s.name === this.current_video.name)) {
        const index = this.videos.findIndex(s => s.name === this.current_video.name);
        this.videos[index] = video;
      } else {
        this.videos.push(video);
      }
      localStorage.setItem('videos', JSON.stringify(this.videos));
      this.show_close_window();
    },

    //編集ボタンを押した時、、
    edit_video(index){
      this.show_window = true;
      this.current_video = { ...this.videos[index] };
    },

    //削除ボタンを押した時、、
    delete_video(index) {
      this.videos.splice(index, 1);
      localStorage.setItem('videos', JSON.stringify(this.videos));
    },

    //再生ボタンを押した時、、
    play_video(videoUrl) {
      const videoId = this.extractVideoID(videoUrl);
      this.currentVideoUrl = `https://www.youtube.com/embed/${videoId}`;
      this.show_video = true;
    },

    //動画urlからidを見つける
    extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      alert('正しいYouTube URLではないため動画を再生できません。');
      return ''; 
    }
    },

    //iframの動画を非表示に
    close_video() {
      this.show_video = false;
    }
}}
</script>


<style>
.video-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
}



</style>