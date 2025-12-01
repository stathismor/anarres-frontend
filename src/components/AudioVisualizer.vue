<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

// Generate random heights for the bars
const bars = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  delay: Math.random() * 0.5,
  duration: 0.4 + Math.random() * 0.4
}))
</script>

<template>
  <div 
    v-if="playerStore.isPlaying"
    class="visualizer-container"
  >
    <div 
      v-for="bar in bars" 
      :key="bar.id"
      class="visualizer-bar"
      :style="{
        animationDelay: `${bar.delay}s`,
        animationDuration: `${bar.duration}s`
      }"
    />
  </div>
</template>

<style scoped>
.visualizer-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  pointer-events: none;
  padding: 20px;
}

.visualizer-bar {
  width: 3px;
  background: linear-gradient(to top, #bf0a26, #e81d3d);
  border-radius: 2px;
  animation: bounce 0.5s ease-in-out infinite alternate;
  opacity: 0.7;
}

.visualizer-bar:nth-child(1) { height: 30%; }
.visualizer-bar:nth-child(2) { height: 50%; }
.visualizer-bar:nth-child(3) { height: 70%; }
.visualizer-bar:nth-child(4) { height: 90%; }
.visualizer-bar:nth-child(5) { height: 60%; }
.visualizer-bar:nth-child(6) { height: 80%; }
.visualizer-bar:nth-child(7) { height: 100%; }
.visualizer-bar:nth-child(8) { height: 70%; }
.visualizer-bar:nth-child(9) { height: 50%; }
.visualizer-bar:nth-child(10) { height: 80%; }
.visualizer-bar:nth-child(11) { height: 40%; }
.visualizer-bar:nth-child(12) { height: 60%; }

@keyframes bounce {
  0% {
    transform: scaleY(0.3);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
