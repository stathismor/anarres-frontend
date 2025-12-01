<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { schedule as staticSchedule, getCurrentDay, mixcloudLinks as staticMixcloudLinks, type DaySchedule } from '@/data/schedule'
import { fetchSchedule } from '@/lib/sanity'

// Reactive state
const activeDay = ref(getCurrentDay())
const currentTime = ref(new Date())
const schedule = ref<DaySchedule[]>(staticSchedule)
const mixcloudLinks = ref<Record<string, string>>(staticMixcloudLinks)
const isLoading = ref(true)
const fromSanity = ref(false)

let timeInterval: ReturnType<typeof setInterval> | null = null

const currentSchedule = computed(() => 
  schedule.value.find(day => day.id === activeDay.value)
)

// Parse time string "HH:MM - HH:MM" to check if current
function isCurrentBroadcast(timeStr: string): boolean {
  if (activeDay.value !== getCurrentDay()) return false
  
  const [start, end] = timeStr.split(' - ')
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  
  const now = currentTime.value
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const startMinutes = startH * 60 + startM
  let endMinutes = endH * 60 + endM
  
  // Handle midnight crossover (e.g., 23:00 - 00:00)
  if (endMinutes === 0) endMinutes = 24 * 60
  
  return currentMinutes >= startMinutes && currentMinutes < endMinutes
}

function getProducerLink(producer: string | undefined): string | undefined {
  if (!producer) return undefined
  const baseName = producer.replace(/\s*\(.*\)\s*$/, '')
  return mixcloudLinks.value[baseName] || mixcloudLinks.value[producer]
}

function formatCurrentTime(): string {
  return currentTime.value.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

async function loadSchedule() {
  isLoading.value = true
  try {
    const data = await fetchSchedule()
    schedule.value = data.schedule
    mixcloudLinks.value = data.mixcloudLinks
    fromSanity.value = data.fromSanity
  } catch (error) {
    console.error('Failed to load schedule:', error)
    // Keep static data as fallback
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadSchedule()
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 30000) // Update every 30 seconds
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<template>
  <div class="max-w-xl mx-auto animate-fade-in">
    <!-- Header -->
    <div class="flex items-baseline justify-center gap-2 mb-4">
      <h2 class="text-2xl font-display font-light tracking-wide lowercase">schedule</h2>
      <span class="text-sm text-white/50 font-light">(EET)</span>
      <!-- CMS indicator (only in dev) -->
      <span 
        v-if="fromSanity" 
        class="text-xs text-green-400/60 ml-2"
        title="Loaded from Sanity CMS"
      >
        ✓ CMS
      </span>
    </div>

    <!-- Current Time Badge -->
    <div 
      v-if="activeDay === getCurrentDay()"
      class="flex justify-center mb-4 animate-slide-up"
    >
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
        </span>
        <span class="text-sm font-mono text-secondary">{{ formatCurrentTime() }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="card p-8">
      <div class="flex items-center justify-center gap-3 text-white/50">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading schedule...</span>
      </div>
    </div>

    <!-- Day Tabs -->
    <div v-else class="card overflow-hidden">
      <div class="border-b border-white/10 overflow-x-auto scrollbar-hide">
        <div class="flex min-w-max">
          <button
            v-for="(day, index) in schedule"
            :key="day.id"
            @click="activeDay = day.id"
            class="px-4 py-3 text-sm font-medium transition-all relative
                   hover:bg-white/5 animate-fade-in"
            :style="{ animationDelay: `${index * 50}ms` }"
            :class="[
              activeDay === day.id 
                ? 'text-secondary bg-secondary/10' 
                : 'text-white/70 hover:text-white',
              day.id === getCurrentDay() && activeDay !== day.id
                ? 'text-secondary/70'
                : ''
            ]"
          >
            {{ day.name }}
            <!-- Today indicator dot -->
            <span 
              v-if="day.id === getCurrentDay()" 
              class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-secondary"
            />
            <div 
              v-if="activeDay === day.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
            />
          </button>
        </div>
      </div>

      <!-- Schedule Content -->
      <div class="p-4">
        <TransitionGroup 
          name="list" 
          tag="div" 
          class="space-y-1"
        >
          <div
            v-for="(broadcast, index) in currentSchedule?.broadcasts"
            :key="`${activeDay}-${index}`"
            class="group rounded-lg transition-all duration-300 animate-slide-up"
            :style="{ animationDelay: `${index * 50}ms` }"
            :class="[
              broadcast.isLive 
                ? 'bg-secondary/20 hover:bg-secondary/30' 
                : 'bg-accent-blue/20 hover:bg-accent-blue/30',
              isCurrentBroadcast(broadcast.time)
                ? 'ring-2 ring-secondary ring-offset-2 ring-offset-primary-dark scale-[1.02]'
                : ''
            ]"
          >
            <div class="flex items-start gap-3 p-3">
              <!-- Time & Badge -->
              <div class="flex-shrink-0 w-28">
                <div class="flex items-center gap-1.5">
                  <!-- Now Playing indicator -->
                  <span 
                    v-if="isCurrentBroadcast(broadcast.time)" 
                    class="relative flex h-2 w-2"
                  >
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span 
                    class="text-sm font-mono"
                    :class="isCurrentBroadcast(broadcast.time) ? 'text-white font-semibold' : 'text-white/80'"
                  >
                    {{ broadcast.time }}
                  </span>
                </div>
                <span 
                  class="badge mt-1 transition-transform group-hover:scale-105"
                  :class="broadcast.isLive ? 'badge-live' : 'badge-playlist'"
                >
                  {{ broadcast.isLive ? 'live' : 'playlist' }}
                </span>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 
                  class="font-semibold truncate transition-colors"
                  :class="isCurrentBroadcast(broadcast.time) ? 'text-white' : ''"
                >
                  {{ broadcast.title }}
                </h3>
                
                <!-- Producer (for live shows) -->
                <a 
                  v-if="broadcast.isLive && broadcast.producer"
                  :href="getProducerLink(broadcast.producer)"
                  target="_blank"
                  class="inline-flex items-center gap-1 text-sm text-white/70 hover:text-secondary transition-colors group/link"
                >
                  {{ broadcast.producer }}
                  <span class="material-icons text-xs opacity-0 group-hover/link:opacity-100 transition-opacity">
                    open_in_new
                  </span>
                </a>
                
                <!-- Tags (for playlists) -->
                <p 
                  v-else-if="broadcast.tags" 
                  class="text-xs text-white/50 mt-0.5"
                >
                  {{ broadcast.tags }}
                </p>
              </div>

              <!-- Now Playing Icon -->
              <div 
                v-if="isCurrentBroadcast(broadcast.time)"
                class="flex-shrink-0"
              >
                <span class="material-icons text-green-400 animate-pulse">
                  graphic_eq
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
