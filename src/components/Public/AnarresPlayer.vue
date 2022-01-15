<template>
  <div class="player">
    <radio-player v-bind="$props"></radio-player>
  </div>
</template>

<style>
.player {
  box-shadow: 0 0 4px 0 var(--background-color), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 var(--background-color);
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: fixed;
  word-wrap: break-word;
  /* bottom: 0; */
  width: 100%;
  background-color: var(--primary-color);
  flex: 1 1 auto;
  /* padding: 0.5rem 0.5rem; */
}
</style>

<script>
import RadioPlayer, { radioPlayerProps } from './Player';
import '../../vendor/bootstrapVue';
import axios from 'axios';
import '../../base.js';

export default {
  inheritAttrs: false,
  components: { RadioPlayer },
  mixins: [radioPlayerProps],
  created() {
    let handleAxiosError = (error) => {
      let notifyMessage =
        'An error occurred and your request could not be completed.';
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
  props: {
    enableRequests: {
      type: Boolean,
      default: false,
    },
    downloadPlaylistUri: {
      type: String,
      required: true,
    },
    requestListUri: {
      type: String,
      required: true,
    },
    customFields: {
      type: Array,
      required: false,
      default: () => [],
    },
    useNchan: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    setNowPlaying(np_new) {
      this.np = np_new;
      this.$emit('np_updated', np_new);
      // this.$refs.history_modal.updateHistory(np_new);

      // Set a "default" current stream if none exists.
      if (this.current_stream.url === '' && this.streams.length > 0) {
        let current_stream = null;

        if (np_new.station.listen_url !== '') {
          this.streams.forEach(function (stream) {
            if (stream.url === np_new.station.listen_url) {
              current_stream = stream;
            }
          });
        }

        if (current_stream === null) {
          current_stream = this.streams[0];
        }

        this.current_stream = current_stream;
      }
    },
  },
};
</script>
