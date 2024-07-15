<template>
  <div>
    <h1>Learning Dashboard</h1>
    <div class="nav nav-tabs">
      <router-link to="/Design/parallax" class="nav-item nav-link" active-class="active">Menu 1</router-link>
      <router-link to="/Design/fade" class="nav-item nav-link" active-class="active">Menu 2</router-link>
      <router-link to="/Design/texture" class="nav-item nav-link" active-class="active">Menu 3</router-link>
    </div>
    <!-- この router-view は /learning/sub1 または /learning/sub2 のコンテンツを表示する -->
    <router-view/>
  </div>
</template>


