<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

function handleScroll() {
  showButton.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial state
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="fade">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full
             bg-secondary/90 hover:bg-secondary text-white
             shadow-lg hover:shadow-xl transition-all duration-300
             hover:scale-110 active:scale-95
             flex items-center justify-center
             backdrop-blur-sm"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <span class="material-icons">keyboard_arrow_up</span>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

