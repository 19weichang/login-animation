<template>
  <Nav></Nav>
  <div id="main">
    <!-- <RouterLink to="/main/aaa">aaa</RouterLink>
    <RouterLink to="/main/bbb">bbb</RouterLink> -->
  </div>
  <!-- <h2>routeName {{ $route.matched[0].children.map(x => x.name) }}</h2> -->
  <!-- <keep-alive> -->
    <!-- <router-view /> -->
  <!-- </keep-alive> -->
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  // @ts-ignore
  import { RouterLink, RouterView } from 'vue-router'
  import Nav from '../components/navbar.vue'
  // import routerConfigs from '../configs/router'
  // console.log(routerConfigs.map(x => x.name));
  
</script>
<style lang="scss">
</style>

