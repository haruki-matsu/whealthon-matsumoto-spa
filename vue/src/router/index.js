//vue-routerからcreateRouter, createWebHistoryをインポート
import { createRouter, createWebHistory } from 'vue-router';
//vueファイルから各コンポーネントをインポートする
import TaskManager from '../components/TaskManager/TaskManager.vue';
import ReferenceSites from '../components/ReferenceSites/ReferenceSites.vue';
import ReferenceVideos from '../components/ReferenceVideos/ReferenceVideos.vue';
import Design from '../components/Design/Design.vue';
import parallax from '../components/Design/parallax.vue';
import Fade from '../components/Design/fade.vue';
import texture from '../components/Design/texture.vue';



//ルートの設定
const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', name: 'TaskManager', component: TaskManager },
  { path: '/sites', name: 'ReferenceSites', component: ReferenceSites },
  { path: '/videos', name: 'ReferenceVideos', component: ReferenceVideos },
  {
    path: '/design',
    component: Design,
    children: [
      { path: '', redirect: '/design/parallax' },
      { path: 'parallax', name: 'parallax', component: parallax },
      { path: 'fade', name: 'Fade', component: Fade },
      { path: 'texture', name: 'texture', component: texture }
    ]
  }
  
];



//ルーターインスタンス作成
const router = createRouter({
  history: createWebHistory(),  //履歴管理法指定
  routes //設定したルート
});

//ルーターインスタンスをエクスポートし別ファイルでも使用できるように
export default router;
