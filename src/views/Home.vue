<script setup lang="ts">
import Schedule from '@/components/Schedule.vue'
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-8 animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-display font-bold mb-2">
        <span class="text-gradient">Anarres FM</span>
      </h1>
      <p class="text-white/60 text-sm sm:text-base">
        Music with no boundaries
      </p>
    </div>
    
    <Schedule />
  </div>
</template>
