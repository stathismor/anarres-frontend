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
          <h4 class="now-playing-title text-secondary1">
            {{ np.now_playing.song.title }}
          </h4>
          <h5 class="now-playing-artist text-secondary1">
            {{ np.now_playing.song.artist }}
          </h5>
        </div>
        <div v-else>
          <h4 class="now-playing-title">{{ np.now_playing.song.text }}</h4>
        </div>

        <div class="time-display" v-if="time_display_played">
          <div class="time-display-played text-secondary1">
            {{ time_display_played }}
          </div>
          <div class="time-display-progress">
            <div class="progress">
              <div
                class="progress-bar bg-secondary1"
                role="progressbar"
                v-bind:style="{ width: time_percent + '%' }"
              ></div>
            </div>
          </div>
          <div class="time-display-total text-secondary1">
            {{ time_display_total }}
          </div>
        </div>
      </div>
    </div>

    <div class="radio-controls">
      <div class="radio-control-mute-button">
        <a
          href="#"
          class="text-secondary1"
          title="Mute"
          @click.prevent="volume = 0"
        >
          <icon icon="volume_mute"></icon>
        </a>
      </div>
      <div class="radio-control-volume-slider">
        <input
          type="range"
          title="Volume"
          class="custom-range"
          min="0"
          max="100"
          step="1"
          v-model="volume"
        />
      </div>
      <div class="radio-control-max-volume-button">
        <a
          href="#"
          class="text-secondary1"
          title="Full Volume"
          @click.prevent="volume = 100"
        >
          <icon icon="volume_up"></icon>
        </a>
      </div>
      <div>
        <a
          class="btn btn-sm btn-outline-secondary"
          v-b-modal.song_history_modal
        >
          <icon class="text-secondary1" icon="history"></icon>
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
.text-secondary1 {
  color: #e0fbfc;
}

.custom-range {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  color: #e0fbfc;
  background-color: transparent;
  padding-left: 0;
  width: 100%;
}

.custom-range:focus {
  outline: 0;
}

.custom-range::-moz-focus-outer {
  border: 0;
}

.custom-range::-moz-range-thumb {
  transition-duration: 0.3s;
  transition-property: box-shadow, height, width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 0.75rem;
  width: 0.75rem;
}

@media (min-width: 576px) {
  .custom-range::-moz-range-thumb {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-moz-range-thumb {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-moz-range-thumb {
    transition: none;
  }
}

.custom-range::-moz-range-thumb:active {
  box-shadow: none;
  height: 1.5rem;
  width: 1.5rem;
}

.custom-range::-moz-range-thumb:focus {
  outline: 0;
}

.custom-range::-moz-range-track {
  transition-duration: 0.3s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-color: transparent;
  border-radius: 0;
  color: transparent;
  cursor: pointer;
  height: 0.125rem;
  width: 100%;
}

@media (min-width: 576px) {
  .custom-range::-moz-range-track {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-moz-range-track {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-moz-range-track {
    transition: none;
  }
}

.custom-range::-ms-fill-lower {
  height: 0.125rem;
  margin-bottom: 0.125rem;
  margin-left: 0.375rem;
}

.custom-range::-ms-fill-upper {
  height: 0.125rem;
  margin-right: 0.375rem;
  margin-bottom: 0.125rem;
}

.custom-range::-ms-thumb {
  transition-duration: 0.3s;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 0.75rem;
  margin-right: 0.375rem;
  margin-left: 0.375rem;
  width: 0.75rem;
}

@media (min-width: 576px) {
  .custom-range::-ms-thumb {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-ms-thumb {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-ms-thumb {
    transition: none;
  }
}

.custom-range::-ms-thumb:focus {
  outline: 0;
}

.custom-range::-ms-track {
  transition-duration: 0.3s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  border-color: transparent;
  border-width: 0.875rem 0;
  color: transparent;
  cursor: pointer;
  height: 0.125rem;
  width: 100%;
}

@media (min-width: 576px) {
  .custom-range::-ms-track {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-ms-track {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-ms-track {
    transition: none;
  }
}

.custom-range::-webkit-slider-runnable-track {
  transition-duration: 0.3s;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  border-color: transparent;
  border-radius: 0;
  color: transparent;
  cursor: pointer;
  height: 0.125rem;
  width: 100%;
}

@media (min-width: 576px) {
  .custom-range::-webkit-slider-runnable-track {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-webkit-slider-runnable-track {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-webkit-slider-runnable-track {
    transition: none;
  }
}

.custom-range::-webkit-slider-thumb {
  transition-duration: 0.3s;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  border-radius: 50%;
  height: 0.75rem;
  margin-top: -0.3125rem;
  width: 0.75rem;
}

@media (min-width: 576px) {
  .custom-range::-webkit-slider-thumb {
    transition-duration: 0.39s;
  }
}

@media (min-width: 992px) {
  .custom-range::-webkit-slider-thumb {
    transition-duration: 0.2s;
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .custom-range::-webkit-slider-thumb {
    transition: none;
  }
}

.custom-range::-webkit-slider-thumb:active {
  box-shadow: 0 0 0 0.375rem #757575;
}

.custom-range::-webkit-slider-thumb:focus {
  outline: 0;
}

.custom-range:active::-moz-range-track,
.custom-range:focus::-moz-range-track {
  background-color: rgba(0, 0, 0, 0.38);
}

.custom-range:active::-ms-fill-upper,
.custom-range:focus::-ms-fill-upper {
  background-color: rgba(0, 0, 0, 0.38);
}

.custom-range:active::-webkit-slider-runnable-track,
.custom-range:focus::-webkit-slider-runnable-track {
  background-color: rgba(0, 0, 0, 0.38);
}

.custom-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 0.75rem rgba(117, 117, 117, 0.12);
}

.custom-range:focus::-ms-range-thumb {
  box-shadow: 0 0 0 0.75rem rgba(117, 117, 117, 0.12);
}

.custom-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 0.75rem rgba(117, 117, 117, 0.12);
}

.custom-range::-moz-range-progress {
  background-color: #e0fbfc;
}

.custom-range::-moz-range-thumb {
  background-color: #e0fbfc;
}

.custom-range::-moz-range-track {
  background-color: #293241;
}

.custom-range::-ms-fill-lower {
  background-color: #757575;
}

.custom-range::-ms-fill-upper {
  background-color: rgba(0, 0, 0, 0.26);
}

.custom-range::-ms-thumb {
  background-color: #757575;
}

.custom-range::-ms-thumb:active {
  box-shadow: 0 0 0 0.375rem #757575;
}

.custom-range::-webkit-slider-runnable-track {
  background-color: rgba(0, 0, 0, 0.26);
}

.custom-range::-webkit-slider-thumb {
  background-color: #757575;
}

.custom-range::-webkit-slider-thumb:active {
  box-shadow: 0 0 0 0.375rem #757575;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
}

.bg-secondary1 {
  background-color: #293241;
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
.radio-player-widget .radio-controls .radio-control-mute-button,
.radio-player-widget .radio-controls .radio-control-max-volume-button {
  flex-shrink: 0;
}
.radio-player-widget .radio-controls .radio-control-volume-slider {
  flex: 1 1 auto;
  max-width: 50%;
}
.radio-player-widget .radio-controls .radio-control-volume-slider input {
  height: 10px;
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
  components: { NowPlaying, SongHistoryModal, Icon, PlayButton, AudioPlayer },
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
    };
  },
  mounted() {
    this.is_mounted = true;
    this.clock_interval = setInterval(this.iterateTimer, 1000);

    if (this.autoplay) {
      this.switchStream(this.current_stream);
    }
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
    volume: {
      get() {
        if (!this.is_mounted) {
          return;
        }

        return this.$refs.player.getVolume();
      },
      set(vol) {
        this.$refs.player.setVolume(vol);
      },
    },
  },
  methods: {
    switchStream(new_stream) {
      this.current_stream = new_stream;
      this.$refs.player.toggle(this.current_stream.url, true);
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
