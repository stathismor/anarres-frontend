<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' }
]
</script>

<template>
  <nav class="sticky top-0 z-50 glass shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <img 
            src="/img/logo.png" 
            alt="Anarres FM" 
            class="h-6 transition-opacity group-hover:opacity-80"
          />
        </RouterLink>

        <!-- Navigation Links -->
        <ul class="flex items-center gap-1">
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
      </div>
    </div>
  </nav>
</template>

