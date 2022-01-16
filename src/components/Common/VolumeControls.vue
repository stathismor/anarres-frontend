<template>
  <div class="volume-controls">
    <div>
      <a href="#" class="icon" title="Mute" @click.prevent="volume = 0">
        <icon icon="volume_mute"></icon>
      </a>
    </div>
    <input
      type="range"
      class="form-range volume-range styled-slider slider-progress"
      id="volume-range"
      min="0"
      max="100"
      step="1"
      v-model.number="volume"
    />
    <div>
      <a
        href="#"
        class="icon full-volume"
        title="Full Volume"
        @click.prevent="volume = 100"
      >
        <icon icon="volume_up"></icon>
      </a>
    </div>
  </div>
</template>

<style scoped>
.volume-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 0;
}
.icon {
  color: var(--foreground-color);
}
@media (max-width: 575px) {
  .icon {
    font-size: 12px;
  }
}
.full-volume {
  padding-left: 0.25rem;
}
.volume-range {
  color: var(--foreground-color);
  background-color: transparent;
}
.volume-range::-moz-range-thumb {
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
.volume-range::-moz-range-thumb:active {
  height: 1rem;
  width: 1rem;
}
.volume-range::-moz-range-progress {
  background-color: var(--foreground-color);
}
.volume-range::-moz-range-thumb {
  background-color: var(--foreground-color);
}
.volume-range::-moz-range-track {
  background-color: var(--background-color);
  height: 0.25rem;
}

/*webkit*/
input[type='range'].styled-slider {
  -webkit-appearance: none;
}

/*progress support*/
input[type='range'].styled-slider.slider-progress {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 2em + var(--ratio) * (100% - 2em));
}

input[type='range'].styled-slider:focus {
  outline: none;
}

input[type='range'].styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  background: var(--foreground-color);
  border: none;
  box-shadow: 0 0 2px var(--background-color);
  margin-top: calc(max((1em - 1px - 1px) * 0.7, 0px) - 2em * 0.5);
}

input[type='range'].styled-slider::-webkit-slider-runnable-track {
  height: 0.25em;
  border-radius: 0.5em;
  background: var(--foreground-color);
  box-shadow: none;
}
input[type='range'].styled-slider::-webkit-slider-thumb:hover {
  background: var(--secondary-color);
}

input[type='range'].styled-slider.slider-progress::-webkit-slider-runnable-track {
  background: linear-gradient(var(--foreground-color), var(--foreground-color))
      0 / var(--sx) 100% no-repeat,
    var(--background-color);
}
</style>

<script>
import Icon from '../Common/Icon';
export default {
  components: { Icon },
  props: {
    getVolume: Function,
  },
  mounted() {
    // HACK: Needed for Chrome volume slider
    for (let e of document.querySelectorAll(
      'input[type="range"].slider-progress'
    )) {
      e.style.setProperty('--value', this.getVolume());
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () =>
        e.style.setProperty('--value', this.getVolume())
      );
    }
  },
  computed: {
    volume: {
      get() {
        return this.getVolume();
      },
      set(value) {
        this.$emit('set_volume', value);
      },
    },
  },
};
</script>
