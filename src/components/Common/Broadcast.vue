<template>
  <div
    class="broadcast-container"
    :class="{ 'broadcast-live': isLive, 'broadcast-playlist': !isLive }"
  >
    <div class="broadcast-item">
      <div class="broadcast-time">{{ time }}</div>
      <div class="broadcast-title">
        <span
          class="badge broadcast-badge"
          :class="{ 'bg-danger': isLive, 'bg-success': !isLive }"
          >{{ isLive ? 'live' : 'playlist' }}
        </span>
        <div class="fw-bold">{{ title }}</div>
      </div>
      <div class="fw-light">{{ producer }}</div>
    </div>
  </div>
</template>

<style scoped>
.broadcast-container {
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* padding-left: 30%; */
  border-bottom: 0.05rem solid var(--foreground-color);
}
.broadcast-item {
  display: flex;
  flex-direction: column;
  /* width: 20rem; */
  justify-content: flex-start;
  align-items: flex-start;
}
.broadcast-title {
  display: flex;
}
.broadcast-badge {
  text-align: center;
  line-height: 1rem;
  margin-right: 0.25rem;
}
.broadcast-live {
  background-color: #bf0a261a;
}
.broadcast-playlist {
  background-color: #1c366c1a;
}
.broadcast-live:hover {
  background-color: #bf0a2666;
}
.broadcast-playlist:hover {
  background-color: #1c366c80;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    title: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
    },
  },
})
export default class RadioShow extends Vue {}
</script>
