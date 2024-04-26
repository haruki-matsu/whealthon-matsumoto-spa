<template>
  <div>
    <h2>参考動画</h2>

    <!-- リストの表示 -->
    <video-list></video-list>

    <!-- 新規追加ボタン -->
    <button @click="show_window">新規作成</button>

    <video-form></video-form>
  </div>
  
</template>


<script>
import VideoList from './VideoList.vue';
import VideoForm from './VideoForm.vue';

export default{
  components: {
    VideoList,
    VideoForm
  }
}

</script>