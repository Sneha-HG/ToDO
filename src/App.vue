<template>
  <div id="app">
    <RouterView />
     <!--  placeholder where route-matched components (like TodoApp.vue) are dynamically injected by the router -->
  </div>
</template>

<script setup>
  <!-- compostion API syntax -->
import { RouterView } from 'vue-router'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding: 1rem;
}
</style>
