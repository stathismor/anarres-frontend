<template>
  <div
    class="broadcast-container"
    :class="{ 'broadcast-live': isLive, 'broadcast-playlist': !isLive }"
  >
    <div class="broadcast-item">
      <div class="last-row">
        <div class="broadcast-time">{{ time }}</div>
        <div>
          <span
            class="badge broadcast-badge"
            :class="{ 'bg-danger': isLive, 'bg-success': !isLive }"
            >{{ isLive ? 'live' : 'playlist' }}
          </span>
        </div>
      </div>
      <div class="broadcast-title">
        <div class="fw-bold">{{ title }}</div>
      </div>
      <div v-if="isLive">
        <a :href="getMixCloud" target="_blank">{{ producer }}</a>
      </div>
      <span v-else class="tag">{{ tags }}</span>
    </div>
  </div>
</template>

<style scoped>
.tag {
  color: grey;
  font-size: 0.75rem;
}
.broadcast-container {
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* padding-left: 30%; */
  border-bottom: 1px solid #fff6;
}
.broadcast-item {
  display: flex;
  flex-direction: column;
  /* width: 20rem; */
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.25rem;
}
.broadcast-title {
  display: flex;
}
.last-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.broadcast-badge {
  /* text-align: center; */
  /* line-height: 1rem; */
  /* margin-right: 0.25rem; */
  font-weight: 500;
}
.broadcast-live {
  background-color: #bf0a2633;
}
.broadcast-playlist {
  background-color: #1c366c33;
}
.broadcast-live:hover {
  background-color: #bf0a2666;
}
.broadcast-playlist:hover {
  background-color: #1c366c80;
}
a,
a:visited {
  color: var(--foreground-color);
  text-decoration: none;
}
a:hover {
  color: var(--secondary-color);
}
@media (max-width: 575px) {
  .broadcast-container {
    line-height: 1rem;
  }
}
</style>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    title: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
    },
    tags: {
      type: String,
    },
  },
  computed: {
    getMixCloud() {
      const mixClouds = {
        'Filthy Pagan': 'https://www.mixcloud.com/Filthy_Pagan/',
        naboer: 'https://www.mixcloud.com/naboer0/',
        phren: 'https://www.mixcloud.com/phrenic/',
        winter: 'https://www.mixcloud.com/cosmodvck/',
        ΜαΓιώ: 'https://www.mixcloud.com/itscosmiccandy/',
        viktoria: 'https://www.mixcloud.com/4741292/uploads/',
        saf: 'https://www.mixcloud.com/post_engineering/',
        zois: 'https://www.mixcloud.com/paparoup/',
        'Preacher Boys': 'https://www.mixcloud.com/gusboggar/',
        Cabal: 'https://www.mixcloud.com/Cabal_Stgm/',
        thnthr: 'https://www.mixcloud.com/thnthr/',
      };
      return mixClouds[this.producer];
    },
  },
})
export default class RadioShow extends Vue {}
</script>
