import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CurrentTrack {
  url: string | null
  isStream: boolean
}

export const usePlayerStore = defineStore('player', () => {
  // State
  const isPlaying = ref(false)
  const current = ref<CurrentTrack>({
    url: null,
    isStream: true
  })
  const volume = ref(80)

  // Getters
  const currentUrl = computed(() => current.value.url)
  const isStream = computed(() => current.value.isStream)

  // Actions
  function toggle(url: string, stream = true) {
    if (current.value.url === url) {
      // Same track - stop
      current.value = { url: null, isStream: true }
      isPlaying.value = false
    } else {
      // Different track - switch
      current.value = { url, isStream: stream }
    }
  }

  function play() {
    isPlaying.value = true
  }

  function stop() {
    isPlaying.value = false
  }

  function setVolume(newVolume: number) {
    volume.value = Math.max(0, Math.min(100, newVolume))
  }

  return {
    // State
    isPlaying,
    current,
    volume,
    // Getters
    currentUrl,
    isStream,
    // Actions
    toggle,
    play,
    stop,
    setVolume
  }
})

