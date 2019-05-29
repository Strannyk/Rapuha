<template>
    <div id="app">
        <navigation-bar></navigation-bar>
        <router-view/>
    </div>
</template>

<script>
  import NavigationBar from './navigation-bar/navigation-bar.vue';

  export default {
    components: {
      NavigationBar
    }
  }
</script>

<style src="./styles/index.scss" lang="scss"></style>
