<template>
  <div id="app">
    <div id="nav">
      <anarres-player
        requestListUri="/api/station/1/requests"
        downloadPlaylistUri="/public/azuratest_radio/playlist.pls"
        nowPlayingUri="https://demo.azuracast.com/api/nowplaying/1"
        v-bind:showAlbumArt="true"
        v-bind:useNchan="false"
      />
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script type="text/javascript">
import AnarresPlayer from './components/Public/AnarresPlayer.vue';
export default {
  components: {
    AnarresPlayer, // register component
  },
};
</script>

<style>
body {
  background: #293241;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.428572;
  margin: 0;
}

/* a {
  background-color: transparent;
  color: #2196f3;
}

a:active,
a:focus,
a:hover {
  color: #42a5f5;
} */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
