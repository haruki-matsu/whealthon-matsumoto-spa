<!-- サイドバーのコンポーネント -->

<template>
    <div class="sidebar">
        <router-link to="/tasks">タスク管理</router-link>
        <router-link to="/sites">参考サイト</router-link>
        <router-link to="/videos">参考動画</router-link>
    </div>
</template>


<script>
// コンポネントの定義
export default {
    name: 'AppSidebar'
}
</script>


