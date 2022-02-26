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

<script>
import RadioPlayer from './components/Public/RadioPlayer.vue';
import Navbar from './components/Common/Navbar.vue';
export default {
  components: {
    Navbar,
    RadioPlayer,
  },
  methods: {
    resize() {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
  },
  created() {
    // We listen to the resize event
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<style>
@import '../assets/css/variables.css';
body {
  margin: 0;
  min-height: 100vh;
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
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
  /* overflow-y: scroll; */
  flex-grow: 1;
  margin-bottom: 7rem;
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
@media (max-width: 575px) {
  #app {
    margin-bottom: 7rem;
    /* font-size: 20rem; */
  }
}
</style>
