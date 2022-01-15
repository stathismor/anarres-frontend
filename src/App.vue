<template>
  <div id="app">
    <navbar />
    <radio-player
      requestListUri="/api/station/1/requests"
      downloadPlaylistUri="/public/anarres/playlist.pls"
      nowPlayingUri="https://admin.anarres.fm/api/nowplaying/1"
      v-bind:useNchan="false"
      radio-player
    />
    <router-view />
  </div>
</template>

<script type="text/javascript">
import RadioPlayer from './components/Public/RadioPlayer.vue';
import Navbar from './components/Common/Navbar.vue';
export default {
  components: {
    Navbar,
    RadioPlayer,
  },
};
</script>

<style>
@import '../assets/css/variables.css';

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--background-color) !important;
  background: var(--background-color) url(../assets/img/background.svg)
    no-repeat center center;
  background-repeat: no-repeat;
  /* background-position: 50% 2rem; */
  /* background-size: contain; */
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.428572;
  /* color: var(--foreground-color); */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
