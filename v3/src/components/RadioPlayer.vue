<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useNowPlayingStore } from '@/stores/nowPlaying'
import PlayButton from '@/components/PlayButton.vue'
import VolumeControl from '@/components/VolumeControl.vue'
import AudioVisualizer from '@/components/AudioVisualizer.vue'

const playerStore = usePlayerStore()
const npStore = useNowPlayingStore()

const audioRef = ref<HTMLAudioElement | null>(null)
const showHistory = ref(false)
const nowPlayingUri = 'https://admin.anarres.fm/api/nowplaying/1'
let pollInterval: ReturnType<typeof setInterval> | null = null

// Computed
const currentStream = computed(() => {
  if (npStore.streams.length === 0) return null
  return npStore.streams.find(s => s.url === npStore.data.station.listen_url) || npStore.streams[0]
})

const elapsedFormatted = computed(() => formatTime(npStore.elapsed))
const totalFormatted = computed(() => formatTime(npStore.data.now_playing.duration))

// Methods
function formatTime(seconds: number): string {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

async function fetchNowPlaying() {
  try {
    const response = await fetch(nowPlayingUri)
    const data = await response.json()
    npStore.update(data)
  } catch (error) {
    console.error('Failed to fetch now playing:', error)
  }
}

// Watch for play state changes
watch(() => playerStore.current.url, (newUrl) => {
  if (!audioRef.value) return
  
  if (newUrl) {
    audioRef.value.src = newUrl
    audioRef.value.play().catch(console.error)
  } else {
    audioRef.value.pause()
    audioRef.value.src = ''
  }
})

// Watch volume changes
watch(() => playerStore.volume, (newVol) => {
  if (audioRef.value) {
    audioRef.value.volume = newVol / 100
  }
})

// Lifecycle
onMounted(() => {
  fetchNowPlaying()
  pollInterval = setInterval(fetchNowPlaying, 15000)
  
  // Set initial volume
  if (audioRef.value) {
    audioRef.value.volume = playerStore.volume / 100
  }
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<template>
  <!-- Hidden audio element -->
  <audio 
    ref="audioRef" 
    @play="playerStore.play()"
    @pause="playerStore.stop()"
    @ended="playerStore.stop()"
  />

  <!-- Player bar -->
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
    <!-- Progress bar (top of player) -->
    <div 
      v-if="npStore.data.now_playing.duration" 
      class="h-1 bg-white/10"
    >
      <div 
        class="h-full bg-gradient-to-r from-secondary to-secondary-light transition-all duration-1000 ease-linear relative overflow-hidden"
        :style="{ width: `${npStore.progress}%` }"
      >
        <!-- Shimmer effect on progress bar -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>

    <div class="flex items-center gap-3 px-3 py-2 sm:px-4">
      <!-- Play Button -->
      <div class="relative flex-shrink-0">
        <PlayButton 
          v-if="currentStream"
          :url="currentStream.url" 
          size="lg"
        />
      </div>

      <!-- Visualizer (shows when playing) -->
      <div 
        v-if="playerStore.isPlaying"
        class="hidden sm:flex w-16 h-12 items-end justify-center gap-0.5 flex-shrink-0"
      >
        <div 
          v-for="i in 8" 
          :key="i"
          class="w-1.5 bg-gradient-to-t from-secondary to-secondary-light rounded-full"
          :class="[
            'animate-bounce',
          ]"
          :style="{
            height: `${20 + Math.random() * 80}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.4 + Math.random() * 0.3}s`
          }"
        />
      </div>

      <!-- Now Playing Info -->
      <div class="flex-1 min-w-0 flex items-center gap-3">
        <!-- Album Art -->
        <div 
          v-if="npStore.currentSong.art" 
          class="hidden sm:block w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-lg 
                 transition-transform duration-300 hover:scale-105 cursor-pointer group relative"
        >
          <img 
            :src="npStore.currentSong.art" 
            :alt="npStore.currentSong.title"
            class="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
          />
          <!-- Pulsing border when playing -->
          <div 
            v-if="playerStore.isPlaying"
            class="absolute inset-0 rounded-lg border-2 border-secondary animate-pulse"
          />
        </div>

        <!-- Track Info -->
        <div class="flex-1 min-w-0">
          <!-- Live indicator -->
          <div v-if="npStore.isLive" class="flex items-center gap-2 mb-0.5">
            <span class="badge badge-live flex items-center gap-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Live
            </span>
            <span class="text-xs text-white/60 truncate">{{ npStore.streamerName }}</span>
          </div>

          <!-- Title & Artist -->
          <h3 class="text-sm font-medium truncate">
            {{ npStore.currentSong.title || npStore.currentSong.text || 'Loading...' }}
          </h3>
          <p class="text-xs text-white/60 truncate">
            {{ npStore.currentSong.artist }}
          </p>

          <!-- Time display -->
          <div 
            v-if="npStore.data.now_playing.duration"
            class="flex items-center gap-2 mt-0.5 text-xs text-white/50"
          >
            <span class="tabular-nums">{{ elapsedFormatted }}</span>
            <span>/</span>
            <span class="tabular-nums">{{ totalFormatted }}</span>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-1">
        <!-- History button -->
        <button 
          @click="showHistory = !showHistory"
          class="icon-btn hidden sm:flex"
          :class="{ 'text-secondary bg-secondary/10': showHistory }"
          title="Song History"
        >
          <span class="material-icons text-xl">history</span>
        </button>
        
        <!-- Volume Control -->
        <VolumeControl class="hidden sm:flex" />
      </div>
    </div>

    <!-- Song History Panel (expandable) -->
    <Transition name="slide">
      <div 
        v-if="showHistory && npStore.songHistory.length"
        class="border-t border-white/10 bg-primary-dark/50 max-h-48 overflow-y-auto"
      >
        <div class="p-3 space-y-2">
          <h4 class="text-xs font-semibold text-white/50 uppercase tracking-wider">
            Recently Played
          </h4>
          <div 
            v-for="(song, index) in npStore.songHistory.slice(0, 5)" 
            :key="index"
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <img 
              v-if="song.song.art"
              :src="song.song.art" 
              class="w-10 h-10 rounded object-cover"
            />
            <div v-else class="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
              <span class="material-icons text-white/30">music_note</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm truncate">{{ song.song.title }}</p>
              <p class="text-xs text-white/50 truncate">{{ song.song.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
}

@keyframes bounce {
  0%, 100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out infinite;
}
</style>
