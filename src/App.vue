<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <phytoplankton-menu></phytoplankton-menu>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import PhytoplanktonMenu from '@/components/PhytoplanktonMenu'
import PhytoplanktonPage from '@/components/PhytoplanktonPage'

export default {
  name: 'app',
  // data () {
  //   return {
  //   }
  // },
  components: {
    PhytoplanktonMenu,
    PhytoplanktonPage
  }
}
</script>

<style>
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
  #app {
    color: #212121;
    font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 18px;
    line-height: 22px;
    font-size: 1.125rem;
    line-height: 1.375rem;
    overflow-x: hidden;
  }
</style>
