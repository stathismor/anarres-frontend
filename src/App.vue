<template>
  <div id="app">
    <div id="nav">
      <anarres-player
        stationName="Anarres Station"
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
