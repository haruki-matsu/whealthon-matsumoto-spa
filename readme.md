## セットアップ方法

1. Docker コンテナをビルドして実行します：  
cd whealthon-matsumoto-spa
docker-compose up --build

2. アプリケーションへのアクセス：  
ブラウザで以下の URL にアクセスしてください：  
http://localhost:8080


## 共有

### ディレクトリ構造
components/
│
├─ Header.vue ヘッダー部分
├─ Sidebar.vue　サイドバー部分
│
├─ site/サイト管理画面用
│   ├─ RefrenceSite.vue　サイト管理画面のルートコンポーネント
│   ├─ SiteForm.vue　編集、登録するフォーム
│   └─ SiteList.vue　サイト一覧のテーブル
│
├─ task/タスク管理画面用
│   └─ TaskManager.vue
│
└─ video/動画管理画面用
    └─ RefrenceVideos.vue




