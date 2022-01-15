<template>
  <div class="now-playing-container">
    <div class="now-playing-art">
      <div v-if="np.now_playing.song.art">
        <a v-bind:href="np.now_playing.song.art" target="_blank">
          <img
            class="now-playing-art"
            v-bind:src="np.now_playing.song.art"
            alt="Album Art"
          />
        </a>
      </div>
    </div>
    <div class="now-playing-item">
      <h6 class="now-playing-live" v-if="np.live.is_live">
        {{ np.live.streamer_name }}
      </h6>

      <div class="now-playing-track" v-if="np.now_playing.song.title !== ''">
        <h4 class="now-playing-title">
          {{ np.now_playing.song.title }}
        </h4>
        <h5 class="now-playing-artist">
          {{ np.now_playing.song.artist }}
        </h5>
      </div>
      <div v-else>
        <h4 class="now-playing-title">{{ np.now_playing.song.text }}</h4>
      </div>

      <div class="time-display-container" v-if="displayElapsed">
        <div class="time-display-item">
          <div class="time-display-time">
            {{ displayElapsed }}
          </div>
          <div class="time-display-progress">
            <div class="player-progress">
              <div
                class="player-progress-bar"
                role="progressbar"
                v-bind:style="{ width: displayProgress + '%' }"
              ></div>
            </div>
          </div>
          <div class="time-display-time">
            {{ time_display_total }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.now-playing-container {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  color: var(--foreground-color);
}
.now-playing-item {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0.25rem;
  justify-content: flex-end;
}
.now-playing-art {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0.25rem 0.25rem 0.25rem 0;
  width: 75px;
  border-radius: 2px;
}
.now-playing-track {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 0.25rem;
}
@media (max-width: 575px) {
  .now-playing-art {
    width: 50px;
  }
  .now-playing-track {
    flex-grow: 5;
  }
  .now-playing-title {
    line-height: 50%;
  }
  .now-playing-artist {
    line-height: 50%;
  }
}
.now-playing-title {
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  white-space: nowrap;
}
.now-playing-artist {
  display: flex;
  justify-content: flex-start;
  font-size: 0.75rem;
  white-space: nowrap;
}
.time-display-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
}
.time-display-item {
  display: flex;
}
.time-display-time {
  font-size: 0.75rem;
}
.time-display-progress {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.player-progress {
  display: flex;
  flex: 1 1 auto;
  background-color: var(--background-color);
  height: 0.25rem;
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
</style>

<script>
import NowPlaying from '../Entity/NowPlaying.js';
import {
  getElapsedTime,
  formatTime,
  getTimePercentage,
} from '../../functions/formatTime.ts';

export default {
  props: {
    np: NowPlaying,
  },
  data() {
    return {
      displayElapsed: null,
      displayProgress: null,
    };
  },
  mounted() {
    this.np = NowPlaying;
    setInterval(this.iterateTimer, 1000);
  },
  computed: {
    time_display_total() {
      let timeTotal = this.np.now_playing.duration;
      return timeTotal ? formatTime(timeTotal) : null;
    },
  },
  methods: {
    iterateTimer() {
      let current_time = Math.floor(Date.now() / 1000);
      let np_elapsed = current_time - this.np.now_playing.played_at;

      if (np_elapsed < 0) {
        np_elapsed = 0;
      } else if (np_elapsed >= this.np.now_playing.duration) {
        np_elapsed = this.np.now_playing.duration;
      }

      this.displayElapsed = getElapsedTime(
        np_elapsed,
        this.np.now_playing.duration
      );
      this.displayProgress = getTimePercentage(
        np_elapsed,
        this.np.now_playing.duration
      );
    },
  },
};
</script>
