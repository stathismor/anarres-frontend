<template>
  <div class="volume-controls">
    <div class="radio-control-mute-button">
      <a href="#" class="icon" title="Mute" @click.prevent="volume = 0">
        <icon icon="volume_mute"></icon>
      </a>
    </div>
    <input
      type="range"
      class="form-range volume-range"
      id="volume-range"
      min="0"
      max="100"
      step="1"
      v-model.number="volume"
    />
    <div class="radio-control-max-volume-button">
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
}
.icon {
  color: var(--foreground-color);
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
  height: 1.25rem;
  width: 1.25rem;
}
.volume-range::-moz-range-progress {
  background-color: var(--foreground-color);
}
.volume-range::-moz-range-thumb {
  background-color: var(--foreground-color);
}
.volume-range::-moz-range-track {
  background-color: var(--background-color);
}
</style>

<script>
import Icon from '../Common/Icon';
export default {
  components: { Icon },
  props: {
    getVolume: Function,
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
