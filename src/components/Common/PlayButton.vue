<template>
  <a href="#" @click.prevent="toggle" :title="langTitle">
    <icon :class="iconClass" :icon="icon"></icon>
  </a>
</template>

<style scoped>
a {
  color: var(--secondary-color);
  font-size: 36px;
}
</style>

<script>
import Icon from './Icon';

import getUrlWithoutQuery from '../../functions/getUrlWithoutQuery';

import store from '../../store.js';

export default {
  name: 'PlayButton',
  components: { Icon },
  props: {
    url: String,
    isStream: {
      type: Boolean,
      default: false,
    },
    iconClass: String,
  },
  computed: {
    isPlaying() {
      return store.state.player.isPlaying;
    },
    current() {
      return store.state.player.current;
    },
    isThisPlaying() {
      if (!this.isPlaying) {
        return false;
      }

      let playingUrl = getUrlWithoutQuery(this.current.url);
      let thisUrl = getUrlWithoutQuery(this.url);
      return playingUrl === thisUrl;
    },
    langTitle() {
      return this.isThisPlaying ? 'Stop' : 'Play';
    },
    icon() {
      return this.isThisPlaying ? 'pause' : 'play_arrow';
    },
  },
  methods: {
    toggle() {
      store.commit('player/toggle', {
        url: this.url,
        isStream: this.isStream,
      });
    },
  },
};
</script>
