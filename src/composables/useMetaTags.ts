import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNowPlayingStore } from '@/stores/nowPlaying'

export function useMetaTags() {
  const route = useRoute()
  const npStore = useNowPlayingStore()

  function updateMetaTag(name: string, content: string, property = false) {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    let element = document.querySelector(selector) as HTMLMetaElement
    
    if (!element) {
      element = document.createElement('meta')
      if (property) {
        element.setAttribute('property', name)
      } else {
        element.setAttribute('name', name)
      }
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', content)
  }

  function updateTitle(title: string) {
    document.title = title
    updateMetaTag('og:title', title, true)
  }

  function updateDescription(description: string) {
    updateMetaTag('description', description)
    updateMetaTag('og:description', description, true)
  }

  // Update meta tags based on route
  watch(
    () => route.path,
    (path) => {
      if (path === '/') {
        const currentSong = npStore.currentSong
        if (currentSong.title && currentSong.artist) {
          updateTitle(`Now Playing: ${currentSong.title} - ${currentSong.artist} | Anarres FM`)
          updateDescription(`Listen to ${currentSong.title} by ${currentSong.artist} on Anarres FM`)
        } else {
          updateTitle('Anarres FM - Music with no boundaries')
          updateDescription('Music with no boundaries. From spacy synths to modern metal sounds, from folk to world sounds. Against every kind of oppression.')
        }
      } else if (path === '/blog') {
        updateTitle('Blog | Anarres FM')
        updateDescription('Latest news and updates from Anarres FM')
      } else if (path === '/about') {
        updateTitle('About | Anarres FM')
        updateDescription('Learn more about Anarres FM - Music with no boundaries')
      }
    },
    { immediate: true }
  )

  // Update meta tags when now playing changes
  watch(
    () => [npStore.currentSong.title, npStore.currentSong.artist],
    ([title, artist]) => {
      if (route.path === '/' && title && artist) {
        updateTitle(`Now Playing: ${title} - ${artist} | Anarres FM`)
        updateDescription(`Listen to ${title} by ${artist} on Anarres FM`)
      }
    }
  )
}

