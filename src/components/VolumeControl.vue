<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const isHovered = ref(false)

const volumeIcon = computed(() => {
  if (playerStore.volume === 0) return 'volume_off'
  if (playerStore.volume < 50) return 'volume_down'
  return 'volume_up'
})

function handleVolumeChange(event: Event) {
  const target = event.target as HTMLInputElement
  playerStore.setVolume(parseInt(target.value))
}

function toggleMute() {
  if (playerStore.volume > 0) {
    playerStore.setVolume(0)
  } else {
    playerStore.setVolume(80)
  }
}
</script>

<template>
  <div 
    class="flex items-center gap-1"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button 
      @click="toggleMute"
      class="p-1 text-white/60 hover:text-white transition-colors"
      :title="playerStore.volume === 0 ? 'Unmute' : 'Mute'"
    >
      <span class="material-icons text-xl">{{ volumeIcon }}</span>
    </button>
    
    <div 
      class="overflow-hidden transition-all duration-200"
      :class="isHovered ? 'w-20 opacity-100' : 'w-0 opacity-0'"
    >
      <input
        type="range"
        min="0"
        max="100"
        :value="playerStore.volume"
        @input="handleVolumeChange"
        class="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
               [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
               [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
               [&::-webkit-slider-thumb]:hover:bg-secondary"
      />
    </div>
  </div>
</template>

