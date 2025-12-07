<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' }
]

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 glass shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group" @click="closeMobileMenu">
          <img 
            src="/img/logo.png" 
            alt="Anarres FM" 
            class="h-6 transition-opacity group-hover:opacity-80"
          />
        </RouterLink>

        <!-- Desktop Navigation Links -->
        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="nav-link"
              :class="{ 'exact-active': link.exact }"
              active-class="active"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden icon-btn"
          aria-label="Toggle menu"
          :aria-expanded="mobileMenuOpen"
        >
          <span class="material-icons">
            {{ mobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide-down">
        <div
          v-if="mobileMenuOpen"
          class="md:hidden border-t border-white/10 py-2"
        >
          <ul class="flex flex-col">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="block px-4 py-2 nav-link"
                :class="{ 'exact-active': link.exact }"
                active-class="active"
                @click="closeMobileMenu"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>

