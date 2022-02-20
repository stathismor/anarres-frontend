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
  height: 100%;
  background-color: var(--background-color) !important;
  background: var(--background-color) url(../assets/img/background.svg)
    no-repeat center center;
  background-repeat: no-repeat;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.428572;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: scroll;
  flex-grow: 1;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
</style>
