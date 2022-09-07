<template>
  <ul>
    <li><button @click="logout">logout</button></li>
    <li><button>setiing</button></li>
  </ul>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  const logout = () => {
    
  }
  
</script>
<style>
  li {
    list-style: none;
  }
</style>