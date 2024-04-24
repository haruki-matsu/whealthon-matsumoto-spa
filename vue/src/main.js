// このファイルでvueアプリケーションのセットアップを行います


// 必要なライブラリとコンポーネントをインポート
import { createApp } from 'vue';
import './assets/reset.css';
import App from './App.vue';
import router from './router';


//アプリケーションインスタンスを作成
const app = createApp(App);

//アプリケーションインスタンスにルーターを統合
app.use(router);  

//アプリケーションインスタンスをHTMLの特定の要素にマウント
app.mount('#app');  
