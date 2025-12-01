import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Song {
  title: string
  artist: string
  album: string
  art: string
  text: string
}

export interface NowPlayingData {
  song: Song
  played_at: number
  duration: number
}

export interface LiveInfo {
  is_live: boolean
  streamer_name: string
}

export interface Mount {
  name: string
  url: string
}

export interface Station {
  name: string
  listen_url: string
  mounts: Mount[]
  remotes: Mount[]
}

export interface NowPlayingState {
  now_playing: NowPlayingData
  live: LiveInfo
  station: Station
  song_history: NowPlayingData[]
}

const defaultState: NowPlayingState = {
  now_playing: {
    song: {
      title: '',
      artist: '',
      album: '',
      art: '',
      text: ''
    },
    played_at: 0,
    duration: 0
  },
  live: {
    is_live: false,
    streamer_name: ''
  },
  station: {
    name: 'Anarres FM',
    listen_url: '',
    mounts: [],
    remotes: []
  },
  song_history: []
}

export const useNowPlayingStore = defineStore('nowPlaying', () => {
  // State
  const data = ref<NowPlayingState>(defaultState)
  const lastUpdate = ref<number>(0)

  // Getters
  const currentSong = computed(() => data.value.now_playing.song)
  const isLive = computed(() => data.value.live.is_live)
  const streamerName = computed(() => data.value.live.streamer_name)
  const streams = computed(() => {
    const allStreams: Mount[] = []
    data.value.station.mounts.forEach(mount => allStreams.push(mount))
    data.value.station.remotes.forEach(remote => allStreams.push(remote))
    return allStreams
  })
  const songHistory = computed(() => data.value.song_history)
  const elapsed = computed(() => {
    const now = Math.floor(Date.now() / 1000)
    let elapsed = now - data.value.now_playing.played_at
    if (elapsed < 0) elapsed = 0
    if (elapsed > data.value.now_playing.duration) {
      elapsed = data.value.now_playing.duration
    }
    return elapsed
  })
  const progress = computed(() => {
    if (!data.value.now_playing.duration) return 0
    return (elapsed.value / data.value.now_playing.duration) * 100
  })

  // Actions
  function update(newData: NowPlayingState) {
    data.value = newData
    lastUpdate.value = Date.now()

    // Update browser media session if available
    if ('mediaSession' in navigator && newData.now_playing.song.title) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: newData.now_playing.song.title,
        artist: newData.now_playing.song.artist,
        artwork: newData.now_playing.song.art 
          ? [{ src: newData.now_playing.song.art }] 
          : []
      })
    }
  }

  function addToHistory(song: NowPlayingData) {
    data.value.song_history.unshift(song)
    // Keep only last 20 songs
    if (data.value.song_history.length > 20) {
      data.value.song_history = data.value.song_history.slice(0, 20)
    }
  }

  return {
    // State
    data,
    lastUpdate,
    // Getters
    currentSong,
    isLive,
    streamerName,
    streams,
    songHistory,
    elapsed,
    progress,
    // Actions
    update,
    addToHistory
  }
})

