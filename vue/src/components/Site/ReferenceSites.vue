<!-- サイト管理画面のルートコンポーネント -->


<template>
  <div>
    <h2>参考サイト一覧</h2>
    <!-- サイト一覧のテーブル -->
    <site-list :sites="sites" @deleteSite="delete_site" @editSite="show_edit_window"></site-list>

    <!-- 新規追加ボタン -->
    <button @click="show_add_window">新規追加</button>

    <!-- 新規追加画面、更新画面のウィンドウ（ボタンを押した時のみ表示） -->
    <site-form v-if="show_window" :current_site="current_site" @saveSite="save_site" @closeWindow="close_window"></site-form>
  </div>
</template>

<script>
import SiteList from './SiteList.vue'; //サイトの一覧をテーブル形式で表示するコンポーネント
import SiteForm from './SiteForm.vue'; //新規サイトの追加や既存サイトの編集を行うフォームを提供するコンポーネント

export default {
  components: {
    SiteList,
    SiteForm
  },
  data() {
    return {
      sites: JSON.parse(localStorage.getItem('sites') || '[]'), //ローカルストレージからサイトデータを読み込み
      show_window: false, //ウインドウを初期時に非表示に設定
      current_site: null //現在編集または新規作成のサイトデータを保持するオブジェクト
    };
  },
  methods: {

    //新規登録画面の表示
    show_add_window() {
      this.current_site = { name: '', url: '', image: '', purpose: '', frequency: '' };
      this.show_window = true;
    },

     //編集画面の表示
    show_edit_window(index) {
      this.current_site = { ...this.sites[index] };
      this.show_window = true;
    },

    //データの新規登録、更新
    save_site(site) {
      if (this.current_site && this.sites.some(s => s.name === this.current_site.name)) {
        const index = this.sites.findIndex(s => s.name === this.current_site.name);
        this.sites[index] = site;
      } else {
        this.sites.push(site);
      }
      localStorage.setItem('sites', JSON.stringify(this.sites));
      this.close_window();
    },

    //データの削除
    delete_site(index) {
      this.sites.splice(index, 1);
      localStorage.setItem('sites', JSON.stringify(this.sites));
    },

    //ウィンドウを閉じる
    close_window() {
      this.show_window = false;
    }
  }
}
</script>



<!-- 
データの大まか動き

①データの読み込み
サイトを開くと、ReferenceSites.vueはローカルストレージからサイトデータを読み込み、
これをSiteList.vueに渡す

②データの更新:
ユーザーがSiteForm.vueでサイト情報を追加または編集し、「保存」ボタンを押すと、
このデータはReferenceSites.vueに送られる

ParentComponent.vueは受け取ったデータをローカルストレージに保存し、
変更をSiteList.vueに反映させる

③データの削除:
SiteList.vueで「削除」ボタンを押すと、
そのサイトのデータはReferenceSites.vueによってローカルストレージから削除され、一覧からも削除されます。
 -->
