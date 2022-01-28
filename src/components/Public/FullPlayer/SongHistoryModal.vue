<template>
  <b-modal
    size="md"
    id="song_history_modal"
    ref="modal"
    title="Song History"
    body-bg-variant="secondary"
    body-text-variant="light"
    header-bg-variant="secondary"
    header-text-variant="light"
    centered
    hide-footer
  >
    <template #modal-header="{ close }">
      <h5>Song History</h5>
      <b-button class="btn btn-danger" @click="close()"> x </b-button>
    </template>
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
