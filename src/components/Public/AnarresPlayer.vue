<template>
  <div>
    <div class="public-page">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">{{ stationName }}</h2>

          <div class="stations nowplaying">
            <radio-player
              v-bind="$props"
              @np_updated="onNowPlayingUpdate"
            ></radio-player>
          </div>
        </div>

        <div class="card-actions">
          <a
            class="btn btn-sm btn-outline-secondary"
            v-b-modal.song_history_modal
          >
            <icon icon="history"></icon>
            Song history
          </a>
          <a
            class="btn btn-sm btn-outline-secondary"
            v-if="enableRequests"
            v-b-modal.request_modal
          >
            <icon icon="help_outline"></icon>
            Request Song
          </a>
          <a
            class="btn btn-sm btn-outline-secondary"
            :href="downloadPlaylistUri"
          >
            <icon icon="file_download"></icon>
            Playlist
          </a>
        </div>
      </div>
    </div>

    <song-history-modal
      :show-album-art="showAlbumArt"
      ref="history_modal"
    ></song-history-modal>
    <request-modal
      :show-album-art="showAlbumArt"
      :request-list-uri="requestListUri"
      :custom-fields="customFields"
    ></request-modal>
  </div>
</template>

<script>
import RadioPlayer, { radioPlayerProps } from './Player';
import SongHistoryModal from './FullPlayer/SongHistoryModal';
import RequestModal from './FullPlayer/RequestModal';
import Icon from '../Common/Icon';
import '../../vendor/bootstrapVue';
import axios from 'axios';
import '../../base.js';

export default {
  inheritAttrs: false,
  components: { Icon, RequestModal, SongHistoryModal, RadioPlayer },
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
    stationName: {
      type: String,
      required: true,
    },
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
    onNowPlayingUpdate(newNowPlaying) {
      this.$refs.history_modal.updateHistory(newNowPlaying);
    },
  },
};
</script>
