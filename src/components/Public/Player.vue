<template>
  <div class="radio-player-widget">
    <now-playing v-bind="$props" @np_updated="setNowPlaying"></now-playing>
    <audio-player
      ref="player"
      v-bind:title="np.now_playing.song.text"
    ></audio-player>
    <div class="now-playing-details">
      <play-button
        class="radio-control-play-button"
        icon-class="outlined lg"
        :url="current_stream.url"
        is-stream
      ></play-button>
      <div
        class="now-playing-art"
        v-if="showAlbumArt && np.now_playing.song.art"
      >
        <a v-bind:href="np.now_playing.song.art" data-fancybox target="_blank">
          <img v-bind:src="np.now_playing.song.art" alt="Album Art" />
        </a>
      </div>
      <div class="now-playing-main">
        <h6 class="now-playing-live" v-if="np.live.is_live">
          <translate key="lang_live" class="badge badge-primary"
            >Live</translate
          >
          {{ np.live.streamer_name }}
        </h6>

        <div v-if="np.now_playing.song.title !== ''">
          <h4 class="now-playing-title foreground-color">
            {{ np.now_playing.song.title }}
          </h4>
          <h5 class="now-playing-artist foreground-color">
            {{ np.now_playing.song.artist }}
          </h5>
        </div>
        <div v-else>
          <h4 class="now-playing-title">{{ np.now_playing.song.text }}</h4>
        </div>

        <div class="time-display" v-if="time_display_played">
          <div class="time-display-played foreground-color">
            {{ time_display_played }}
          </div>
          <div class="time-display-progress">
            <div class="player-progress">
              <div
                class="player-progress-bar"
                role="progressbar"
                v-bind:style="{ width: time_percent + '%' }"
              ></div>
            </div>
          </div>
          <div class="time-display-total foreground-color">
            {{ time_display_total }}
          </div>
        </div>
      </div>
    </div>
    <div class="radio-controls">
      <volume-controls :get-volume="getVolume" @set_volume="setVolume" />
      <div>
        <a class="btn btn-sm" v-b-modal.song_history_modal>
          <icon class="foreground-color" icon="history"></icon>
        </a>
      </div>
    </div>
    <song-history-modal
      :show-album-art="showAlbumArt"
      ref="history_modal"
    ></song-history-modal>
  </div>
</template>

<style lang="css">
.foreground-color {
  color: var(--foreground-color);
}

.player-progress {
  background-color: var(--background-color);
  display: flex;
  height: 0.25rem;
  overflow: hidden;
  line-height: 0;
}

.player-progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  background-color: var(--foreground-color);
}
.radio-player-widget {
  display: flex;
}

.radio-player-widget .now-playing-details {
  display: flex;
  align-items: center;
  width: 100%;
}
.radio-player-widget .now-playing-details .now-playing-art {
  padding-right: 0.5rem;
}
.radio-player-widget .now-playing-details .now-playing-art img {
  width: 75px;
  height: auto;
  border-radius: 5px;
}
@media (max-width: 575px) {
  .radio-player-widget .now-playing-details .now-playing-art img {
    width: 50px;
  }
}
.radio-player-widget .now-playing-details .now-playing-main {
  flex: 1;
  min-width: 0;
}
.radio-player-widget .now-playing-details h4,
.radio-player-widget .now-playing-details h5,
.radio-player-widget .now-playing-details h6 {
  margin: 0;
  line-height: 1.3;
}
.radio-player-widget .now-playing-details h4 {
  font-size: 15px;
}
.radio-player-widget .now-playing-details h5 {
  font-size: 13px;
  font-weight: normal;
}
.radio-player-widget .now-playing-details h6 {
  font-size: 11px;
  font-weight: normal;
}
.radio-player-widget .now-playing-details .now-playing-title,
.radio-player-widget .now-playing-details .now-playing-artist {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.radio-player-widget .now-playing-details .now-playing-title:hover,
.radio-player-widget .now-playing-details .now-playing-artist:hover {
  text-overflow: clip;
  white-space: normal;
  word-break: break-all;
}
.radio-player-widget .now-playing-details .time-display {
  font-size: 10px;
  margin-top: 0.25rem;
  flex-direction: row;
  align-items: center;
  display: flex;
}
.radio-player-widget .now-playing-details .time-display .time-display-played {
  margin-right: 0.5rem;
}
.radio-player-widget .now-playing-details .time-display .time-display-progress {
  flex: 1 1 auto;
}
.radio-player-widget
  .now-playing-details
  .time-display
  .time-display-progress
  .progress-bar {
  -webkit-transition: width 1s;
  /* Safari */
  transition: width 1s;
  transition-timing-function: linear;
}
.radio-player-widget .now-playing-details .time-display .time-display-total {
  margin-left: 0.5rem;
}
.radio-player-widget hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.radio-player-widget i.material-icons {
  line-height: 1;
}
.radio-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.radio-player-widget .radio-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
  padding-top: 2.5rem;
}
.radio-player-widget .radio-controls .radio-control-play-button {
  margin-right: 0.25rem;
}
.radio-player-widget .radio-controls .radio-control-select-stream {
  flex: 1 1 auto;
}
</style>

<script>
import AudioPlayer from '../Common/AudioPlayer';
import NowPlaying, { nowPlayingProps } from '../Common/NowPlaying';
import InitialNowPlaying from '../Entity/NowPlaying';
import Icon from '../Common/Icon';
import SongHistoryModal from './FullPlayer/SongHistoryModal';
import '../../base.js';
import axios from 'axios';
import PlayButton from '../Common/PlayButton';
import VolumeControls from '../Common/VolumeControls.vue';

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
    showAlbumArt: {
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
  components: {
    NowPlaying,
    SongHistoryModal,
    Icon,
    PlayButton,
    AudioPlayer,
    VolumeControls,
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
    this.is_mounted = true;
    this.clock_interval = setInterval(this.iterateTimer, 1000);
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
    time_percent() {
      let time_played = this.np_elapsed;
      let time_total = this.np.now_playing.duration;

      if (!time_total) {
        return 0;
      }
      if (time_played > time_total) {
        return 100;
      }

      return (time_played / time_total) * 100;
    },
    time_display_played() {
      let time_played = this.np_elapsed;
      let time_total = this.np.now_playing.duration;

      if (!time_total) {
        return null;
      }

      if (time_played > time_total) {
        time_played = time_total;
      }

      return this.formatTime(time_played);
    },
    time_display_total() {
      let time_total = this.np.now_playing.duration;
      return time_total ? this.formatTime(time_total) : null;
    },
  },
  methods: {
    setVolume(volume) {
      this.$refs.player.setVolume(volume);
    },
    getVolume() {
      return this.$refs.player.getVolume();
    },
    setNowPlaying(np_new) {
      this.np = np_new;
      this.$emit('np_updated', np_new);
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
    iterateTimer() {
      let current_time = Math.floor(Date.now() / 1000);
      let np_elapsed = current_time - this.np.now_playing.played_at;
      if (np_elapsed < 0) {
        np_elapsed = 0;
      } else if (np_elapsed >= this.np.now_playing.duration) {
        np_elapsed = this.np.now_playing.duration;
      }
      this.np_elapsed = np_elapsed;
    },
    formatTime(time) {
      let sec_num = parseInt(time, 10);

      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
    },
  },
};
</script>
