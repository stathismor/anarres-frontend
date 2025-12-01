<script setup lang="ts">
const socialLinks = [
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/anarres.fm',
    icon: 'facebook'
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/anarresfm/',
    icon: 'instagram'
  }
]
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-2xl">
    <!-- Quote -->
    <blockquote class="text-center mb-16 animate-fade-in">
      <p class="text-xl sm:text-2xl font-display font-light text-white/90 leading-relaxed mb-4 tracking-wide">
        Music with no boundaries. From spacy synths to modern metal sounds, 
        from folk to world sounds.
      </p>
      <p class="text-lg sm:text-xl font-display text-gradient font-normal tracking-wider animate-slide-up animation-delay-200">
        Against every kind of oppression.
      </p>
    </blockquote>

    <!-- Footer sections -->
    <div class="flex flex-wrap justify-center gap-12 sm:gap-20 animate-slide-up animation-delay-300">
      <!-- Social Links -->
      <div class="text-center">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Find us
        </h3>
        <div class="flex gap-4 justify-center">
          <a
            v-for="(link, index) in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="link.name"
            class="w-12 h-12 flex items-center justify-center rounded-full 
                   bg-white/5 hover:bg-secondary/20 hover:text-secondary
                   transition-all duration-300 hover:scale-110 hover:shadow-glow
                   animate-fade-in"
            :style="{ animationDelay: `${400 + index * 100}ms` }"
          >
            <svg v-if="link.icon === 'facebook'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <svg v-else-if="link.icon === 'instagram'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Donate -->
      <div class="text-center animate-fade-in animation-delay-500">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Support us
        </h3>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=34U9EFS93HW6Q"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full
                 bg-[#0070ba] hover:bg-[#003087] text-white font-medium
                 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl
                 active:scale-95"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
          </svg>
          Donate
        </a>
      </div>
    </div>
  </div>
</template>
