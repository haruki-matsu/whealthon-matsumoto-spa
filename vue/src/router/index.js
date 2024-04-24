//このファイルではルーターの設定を行います


//veurouterの機能をインポート
//（createWebHistory関数はクリーンなURLとSEOのために使用)
import { createRouter, createWebHistory } from 'vue-router';

//それぞれのページのコンポーネントをインポート
import TaskManager from '@/components/Task/TaskManager.vue';
import ReferenceSites from '@/components/Site/ReferenceSites.vue';
import ReferenceVideos from '@/components/Video/ReferenceVideos.vue';

//ルーターインスタンスの作成
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/tasks', component: TaskManager },
    { path: '/sites', component: ReferenceSites },
    { path: '/videos', component: ReferenceVideos }
  ]
});

//ルーターインスタンスのエクスポート
export default router;