<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
  showImage?: boolean
}>(), {
  count: 3,
  showImage: true
})
</script>

<template>
  <div class="space-y-6">
    <div 
      v-for="n in count" 
      :key="n" 
      class="card p-6 animate-fade-in"
      :style="{ animationDelay: `${n * 100}ms` }"
    >
      <!-- Image skeleton -->
      <div 
        v-if="showImage" 
        class="skeleton h-48 rounded-lg mb-4"
      />
      
      <!-- Content skeleton -->
      <div class="space-y-3">
        <!-- Title -->
        <div class="skeleton h-7 w-3/4 rounded" />
        
        <!-- Meta -->
        <div class="flex gap-4">
          <div class="skeleton h-4 w-24 rounded" />
          <div class="skeleton h-4 w-32 rounded" />
        </div>
        
        <!-- Body lines -->
        <div class="space-y-2 pt-2">
          <div class="skeleton h-4 w-full rounded" />
          <div class="skeleton h-4 w-full rounded" />
          <div class="skeleton h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>

