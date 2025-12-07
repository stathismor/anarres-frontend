<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// WidgetBot configuration
const SERVER_ID = '388072481098825739'
const CHANNEL_ID = '904279350176800789'
const CRATE_COLOR = '#1c366cff' // Matches primary-blue from old site

const widgetLoaded = ref(false)
let crateInstance: any = null // WidgetBot Crate instance

function waitForCrate(maxAttempts = 20, delay = 100): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const checkCrate = () => {
      // @ts-ignore
      if (window.Crate) {
        resolve()
      } else if (attempts < maxAttempts) {
        attempts++
        setTimeout(checkCrate, delay)
      } else {
        reject(new Error('WidgetBot Crate not available after waiting'))
      }
    }
    checkCrate()
  })
}

function loadWidgetBot() {
  if (widgetLoaded.value || typeof window === 'undefined') return

  // Check if already loaded
  // @ts-ignore
  if (window.Crate) {
    initializeCrate()
    return
  }

  // Check if script is already in the DOM
  const existingScript = document.querySelector('script[src*="@widgetbot/crate"]')
  if (existingScript) {
    // Script exists, wait for it to load
    waitForCrate()
      .then(() => initializeCrate())
      .catch((error) => {
        console.error('Failed to wait for WidgetBot Crate:', error)
      })
    return
  }

  // Create and load script
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3'
  script.async = true
  
  script.onload = () => {
    // Wait a bit for Crate to be available
    waitForCrate()
      .then(() => initializeCrate())
      .catch((error) => {
        console.error('Failed to initialize WidgetBot Crate:', error)
      })
  }
  
  script.onerror = (e) => {
    console.error('Failed to load WidgetBot script:', e)
  }
  
  // Append to body instead of head (recommended by WidgetBot docs)
  document.body.appendChild(script)
}

function initializeCrate() {
  try {
    // @ts-ignore
    crateInstance = new window.Crate({
      server: SERVER_ID,
      channel: CHANNEL_ID,
      color: CRATE_COLOR,
      // Position the button above the fixed player
      css: `
        .root .button { 
          z-index: 15 !important; 
          right: 0.75rem !important; 
          bottom: 6rem !important;
        } 
        .root .embed { 
          z-index: 14 !important; 
          bottom: 6.5rem !important;
          right: 0.75rem !important;
        }
      `,
    })
    widgetLoaded.value = true
    console.log('WidgetBot Crate initialized successfully', crateInstance)
  } catch (error) {
    console.error('Error initializing WidgetBot Crate:', error)
  }
}

onMounted(() => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    loadWidgetBot()
  }, 100)
})

onUnmounted(() => {
  if (crateInstance) {
    // WidgetBot Crate doesn't have a destroy method, but we can try to remove it
    if (typeof crateInstance.destroy === 'function') {
      crateInstance.destroy()
    }
    crateInstance = null
    widgetLoaded.value = false
  }
})
</script>

<template>
  <!-- WidgetBot Crate creates its own button and embed automatically -->
  <!-- This component just initializes it -->
  <div v-if="!widgetLoaded" class="fixed bottom-24 right-4 z-40">
    <div class="w-14 h-14 rounded-full bg-[#5865F2] animate-pulse flex items-center justify-center">
      <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </div>
  </div>
</template>

