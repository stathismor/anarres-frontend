<template>
  <div id="app">
    <navbar />
    <anarres-player
      requestListUri="/api/station/1/requests"
      downloadPlaylistUri="/public/anarres/playlist.pls"
      nowPlayingUri="https://admin.anarres.fm/api/nowplaying/1"
      v-bind:showAlbumArt="true"
      v-bind:useNchan="false"
    />
    <router-view />
  </div>
</template>

<script type="text/javascript">
import AnarresPlayer from './components/Public/AnarresPlayer.vue';
import Navbar from './components/Common/Navbar.vue';
export default {
  components: {
    AnarresPlayer,
    Navbar,
  },
};
</script>

<style>
@import '../assets/css/variables.css';
body {
  margin: 0;
  min-height: 100vh;
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
  color: var(--foreground-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
