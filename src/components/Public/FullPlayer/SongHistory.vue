<template>
  <div id="station-history">
    <p v-if="history.length <= 0">No records to display.</p>
    <div class="song" v-for="(row, index) in history" v-bind:key="index">
      <strong class="order">{{ history.length - index }}</strong>
      <img v-if="showAlbumArt" class="art" :src="row.song.art" />
      <div class="name">
        <strong v-html="row.song.title"></strong>
        <span v-html="albumAndArtist(row.song)"></span>
      </div>
      <div class="break"></div>
      <small class="date-played text-muted">
        <span v-html="unixTimestampToDate(row.played_at)">{{
          row.played_at
        }}</span>
      </small>
    </div>
  </div>
</template>

<style lang="css">
#station-history .song {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  line-height: normal;
  margin-bottom: 15px;
}
#station-history .song:last-child {
  margin-bottom: 0;
}
#station-history .song .order {
  display: flex;
  flex-direction: column;
  width: 35px;
  justify-content: center;
  margin-right: 5px;
  text-align: center;
}
#station-history .song .art {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 5px;
}
#station-history .song .name {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}
#station-history .song .date-played {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px 0 0 40px;
}
#station-history .song .break {
  flex-basis: 100%;
  height: 0;
}
@media (min-width: 576px) {
  #station-history .song .date-played {
    margin-left: auto;
  }
  #station-history .song .break {
    display: none;
  }
}
</style>

<script>
import { DateTime } from 'luxon';

export default {
  props: {
    history: Array,
    showAlbumArt: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    unixTimestampToDate(timestamp) {
      if (!timestamp) {
        return '';
      }

      return DateTime.fromSeconds(timestamp).toRelative();
    },
    albumAndArtist(song) {
      return [song.album, song.artist].filter((str) => !!str).join(', ');
    },
  },
};
</script>
