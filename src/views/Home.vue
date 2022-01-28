<template>
  <div class="home">
    <Schedule />
  </div>
</template>

<style scoped>
.home {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* min-height: 80vh; */
  overflow: hidden;
  margin-bottom: 6rem;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Schedule from '@/components/Public/Schedule.vue';

@Component({
  components: {
    Schedule,
  },
})
export default class Home extends Vue {}
</script>
