<template>
  <div></div>
</template>

<script>
import NchanSubscriber from 'nchan';
import axios from 'axios';
import '../../base.js';
import NowPlaying from '../Entity/NowPlaying.js';

export const nowPlayingProps = {
  props: {
    nowPlayingUri: {
      type: String,
      required: true,
    },
    initialNowPlaying: {
      type: Object,
      default() {
        return NowPlaying;
      },
    },
    useNchan: {
      type: Boolean,
      default: true,
    },
  },
};

export default {
  mixins: [nowPlayingProps],
  data() {
    return {
      nchan_subscriber: null,
    };
  },
  mounted() {
    // Convert initial NP data from prop to data.
    this.setNowPlaying(this.initialNowPlaying);

    setTimeout(this.checkNowPlaying, 3000);
  },
  created() {
    let handleAxiosError = (error) => {
      let notifyMessage = this.$gettext(
        'An error occurred and your request could not be completed.'
      );
      if (error.response) {
        // Request made and server responded
        notifyMessage = error.response.data.message;
        console.error(notifyMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }

      if (typeof this.$notifyError === 'function') {
        this.$notifyError(notifyMessage);
      }
    };

    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );
  },
  methods: {
    checkNowPlaying() {
      if (this.useNchan) {
        this.nchan_subscriber = new NchanSubscriber(this.nowPlayingUri);
        this.nchan_subscriber.on('message', (message, message_metadata) => {
          let np_new = JSON.parse(message);
          setTimeout(() => {
            this.setNowPlaying(np_new);
          }, 1000);
        });
        this.nchan_subscriber.start();
      } else {
        this.axios
          .get(this.nowPlayingUri)
          .then((response) => {
            this.setNowPlaying(response.data);

            setTimeout(this.checkNowPlaying, !document.hidden ? 5000 : 3000);
          })
          .catch((error) => {
            setTimeout(this.checkNowPlaying, !document.hidden ? 30000 : 120000);
          });
      }
    },
    setNowPlaying(np_new) {
      // Update the browser metadata for browsers that support it (i.e. Mobile Chrome)
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: np_new.now_playing.song.title,
          artist: np_new.now_playing.song.artist,
          artwork: [{ src: np_new.now_playing.song.art }],
        });
      }

      this.$emit('np_updated', np_new);
      this.$eventHub.$emit('np_updated', np_new);

      document.dispatchEvent(
        new CustomEvent('now-playing', {
          detail: np_new,
        })
      );
    },
  },
};
</script>
