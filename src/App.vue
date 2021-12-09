<template>
  <AppHeader />
  <div class="layout-main-container">
    <div class="layout-main">
      <router-view />
    </div>
  </div>  
  <AppFooter />
</template>

<script>
import AppHeader from "./components/AppHeader.vue" 
import AppFooter from "./components/AppFooter.vue" 

export default {
  name: "App",
  components: {
    AppHeader: AppHeader,
    AppFooter: AppFooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
