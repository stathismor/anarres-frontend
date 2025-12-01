<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const props = withDefaults(defineProps<{
  url: string
  isStream?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  isStream: true,
  size: 'md'
})

const playerStore = usePlayerStore()

const isThisPlaying = computed(() => {
  if (!playerStore.isPlaying) return false
  // Compare URLs without query strings
  const currentUrl = playerStore.current.url?.split('?')[0]
  const thisUrl = props.url.split('?')[0]
  return currentUrl === thisUrl
})

const icon = computed(() => isThisPlaying.value ? 'pause' : 'play_arrow')
const title = computed(() => isThisPlaying.value ? 'Stop' : 'Play')

const sizeClasses = {
  sm: 'text-4xl',
  md: 'text-5xl',
  lg: 'text-6xl sm:text-7xl'
}

function toggle() {
  playerStore.toggle(props.url, props.isStream)
}
</script>

<template>
  <button 
    @click="toggle"
    :title="title"
    class="text-secondary hover:text-secondary-light transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-full"
  >
    <span :class="['material-icons', sizeClasses[size]]">{{ icon }}</span>
  </button>
</template>

