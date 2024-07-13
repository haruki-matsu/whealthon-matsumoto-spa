//vue-routerからcreateRouter, createWebHistoryをインポート
import { createRouter, createWebHistory } from 'vue-router';
//vueファイルから各コンポーネントをインポートする
import TaskManager from '../components/TaskManager/TaskManager.vue';
import ReferenceSites from '../components/ReferenceSites/ReferenceSites.vue';
import ReferenceVideos from '../components/ReferenceVideos/ReferenceVideos.vue';

//ルートの設定
const routes = [
  {
    //初期時はtasksにリダイレクト
    path: '/',
    redirect: '/tasks'
  },
  {
    //name:ルート名/component:active時に表示されるコンポーネント
    //タスクボタンクリックで、タスク管理コンポーネントを表示
    path: '/tasks',
    name: 'TaskManager',
    component: TaskManager
  },
  {
    //参考サイトボタンクリックで、参考サイトコンポーネントを表示
    path: '/sites',
    name: 'ReferenceSites',
    component: ReferenceSites
  },
  {
    //参考動画ボタンクリックで、参考動画コンポーネントを表示
    path: '/videos',
    name: 'ReferenceVideos',
    component: ReferenceVideos
  }
];

//ルーターインスタンス作成
const router = createRouter({
  history: createWebHistory(),  //履歴管理法指定
  routes //設定したルート
});

//ルーターインスタンスをエクスポートし別ファイルでも使用できるように
export default router;
