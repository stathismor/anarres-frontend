<template>
  <div>
    <audio-player ref="player"></audio-player>
    <div class="player-container">
      <div class="play-button">
        <play-button :url="current_stream.url"></play-button>
      </div>
      <now-playing-progress :np="np"></now-playing-progress>
      <div class="player-controls">
        <div class="history">
          <a href="#" class="icon" v-b-modal.song_history_modal>
            <icon icon="history"></icon>
          </a>
        </div>
        <volume-controls :get-volume="getVolume" @set_volume="setVolume" />
      </div>
    </div>
    <song-history-modal ref="history_modal"></song-history-modal>
  </div>
</template>

<style>
.player-container {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--primary-color);
  min-width: 0;
}
.play-button {
  display: flex;
  align-items: center;
}
.player-controls {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 10rem;
}
@media (max-width: 575px) {
  .player-controls {
    width: 6rem;
  }
  .icon {
    font-size: 12px;
  }
}

.history {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
</style>

<script>
import PlayButton from '../Common/PlayButton';
import NowPlayingProgress, {
  nowPlayingProps,
} from '../Common/NowPlayingProgress';
import InitialNowPlaying from '../Entity/NowPlaying';
import NchanSubscriber from 'nchan';
import axios from 'axios';
import VolumeControls from '../Common/VolumeControls.vue';
import Icon from '../Common/Icon';
import '../../vendor/bootstrapVue';
import '../../base.js';
import AudioPlayer from '../Common/AudioPlayer';
import SongHistoryModal from './FullPlayer/SongHistoryModal';

export const radioPlayerProps = {
  ...nowPlayingProps,
  props: {
    nowPlayingUri: {
      type: String,
      required: true,
    },
    initialNowPlaying: {
      type: Object,
      default() {
        return InitialNowPlaying;
      },
    },
    useNchan: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
};

export default {
  inheritAttrs: false,
  components: {
    AudioPlayer,
    PlayButton,
    NowPlayingProgress,
    VolumeControls,
    SongHistoryModal,
    Icon,
  },
  mixins: [radioPlayerProps],
  data() {
    return {
      is_mounted: false,
      np: this.initialNowPlaying,
      np_elapsed: 0,
      current_stream: {
        name: '',
        url: '',
      },
      clock_interval: null,
      player: this.$refs.player,
    };
  },
  mounted() {
    // Convert initial NP data from prop to data.
    this.setNowPlaying(this.initialNowPlaying);
    this.checkNowPlaying();
  },
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
  computed: {
    streams() {
      let all_streams = [];
      this.np.station.mounts.forEach(function (mount) {
        all_streams.push({
          name: mount.name,
          url: mount.url,
        });
      });
      this.np.station.remotes.forEach(function (remote) {
        all_streams.push({
          name: remote.name,
          url: remote.url,
        });
      });
      return all_streams;
    },
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
    checkNowPlaying() {
      if (this.useNchan) {
        this.nchan_subscriber = new NchanSubscriber(this.nowPlayingUri);
        this.nchan_subscriber.on('message', (message, message_metadata) => {
          let np_new = JSON.parse(message);
          setTimeout(() => {
            this.setNowPlaying(np_new);
          });
        });
        this.nchan_subscriber.start();
      } else {
        this.axios
          .get(this.nowPlayingUri)
          .then((response) => {
            this.setNowPlaying(response.data);

            setTimeout(this.checkNowPlaying, !document.hidden ? 15000 : 30000);
          })
          .catch((error) => {
            setTimeout(this.checkNowPlaying, !document.hidden ? 30000 : 120000);
          });
      }
    },
    setNowPlaying1(np_new) {
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
    setNowPlaying(np_new) {
      this.setNowPlaying1(np_new);
      this.np = np_new;
      //   this.$emit('np_updated', np_new);
      this.$refs.history_modal.updateHistory(np_new);

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
    setVolume(volume) {
      this.$refs.player.setVolume(volume);
    },
    getVolume() {
      return this.$refs.player.getVolume();
    },
  },
};
</script>
