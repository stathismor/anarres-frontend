<template>
  <div>
    <div class="player">
      <div class="stations nowplaying">
        <radio-player v-bind="$props"></radio-player>
      </div>
    </div>
  </div>
</template>

<style>
.player {
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12),
    0 1px 5px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  word-wrap: break-word;
  position: fixed;
  bottom: 0;
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
};
</script>
