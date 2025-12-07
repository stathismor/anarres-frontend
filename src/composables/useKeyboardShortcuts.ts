import { onMounted, onUnmounted } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useNowPlayingStore } from '@/stores/nowPlaying'

export function useKeyboardShortcuts() {
  const playerStore = usePlayerStore()
  const npStore = useNowPlayingStore()

  function handleKeyPress(event: KeyboardEvent) {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return
    }

    // Spacebar: Play/Pause
    if (event.code === 'Space' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      const streams = npStore.streams
      if (streams.length > 0) {
        const currentStream = streams.find(s => s.url === npStore.data.station.listen_url) || streams[0]
        if (currentStream) {
          playerStore.toggle(currentStream.url, true)
        }
      }
      return
    }

    // Arrow Up: Volume Up
    if (event.code === 'ArrowUp' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      playerStore.setVolume(Math.min(100, playerStore.volume + 5))
      return
    }

    // Arrow Down: Volume Down
    if (event.code === 'ArrowDown' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      playerStore.setVolume(Math.max(0, playerStore.volume - 5))
      return
    }

    // M: Mute/Unmute
    if (event.code === 'KeyM' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      if (playerStore.volume > 0) {
        // Store previous volume and mute
        ;(playerStore as any).previousVolume = playerStore.volume
        playerStore.setVolume(0)
      } else {
        // Restore previous volume or set to 50
        const prevVol = (playerStore as any).previousVolume || 50
        playerStore.setVolume(prevVol)
      }
      return
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
}

