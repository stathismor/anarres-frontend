<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import RadioPlayer from '@/components/RadioPlayer.vue'
import DiscordWidget from '@/components/DiscordWidget.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 overflow-y-auto pb-24">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <RadioPlayer />
    <DiscordWidget />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

