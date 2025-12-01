<script setup lang="ts">
import Schedule from '@/components/Schedule.vue'
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-8 animate-fade-in">
      <h1 class="text-4xl sm:text-5xl font-display font-light tracking-wide mb-2 lowercase">
        <span class="text-gradient">anarres.fm</span>
      </h1>
      <p class="text-white/60 text-sm sm:text-base font-light tracking-wider">
        music with no boundaries
      </p>
    </div>
    
    <Schedule />
  </div>
</template>
