<template>
  <b-modal
    size="md"
    id="song_history_modal"
    ref="modal"
    title="Song History"
    centered
    hide-footer
  >
    <song-history :history="history"></song-history>
  </b-modal>
</template>

<script>
import SongHistory from './SongHistory';

export default {
  components: { SongHistory },
  data() {
    return {
      history: [],
    };
  },
  methods: {
    updateHistory(np) {
      this.history = np.song_history;
    },
  },
};
</script>
