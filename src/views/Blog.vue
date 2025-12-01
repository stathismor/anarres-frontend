<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { sanityClient } from '@/lib/sanity'
import { toHTML } from '@portabletext/to-html'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

interface BlogPost {
  _id: string
  title: string
  publishedAt: string | null
  body: any
  author: { name: string } | null
  categories: { title: string }[] | null
  mainImage: string | null
}

const posts = ref<BlogPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getCategory(post: BlogPost): string {
  return post.categories?.[0]?.title || 'Uncategorized'
}

function renderBody(body: any): string {
  if (!body) return ''
  try {
    return toHTML(body)
  } catch (e) {
    console.error('Failed to render body:', e)
    return '<p>Content could not be rendered</p>'
  }
}

async function fetchPosts() {
  try {
    console.log('Fetching posts...')
    const result = await sanityClient.fetch<BlogPost[]>(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        publishedAt,
        body,
        "author": author->{name},
        "categories": categories[]->{title},
        "mainImage": mainImage.asset->url
      }
    `)
    console.log('Fetched posts:', result)
    posts.value = result || []
  } catch (e) {
    console.error('Fetch error:', e)
    error.value = 'Failed to load blog posts: ' + (e instanceof Error ? e.message : String(e))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <h1 class="text-3xl sm:text-4xl font-display font-bold text-center mb-8">
      Latest Blog Posts
    </h1>

    <!-- Loading State -->
    <SkeletonLoader v-if="loading" :count="2" />

    <!-- Error State -->
    <div v-else-if="error" class="card p-8 text-center">
      <span class="material-icons text-4xl text-secondary mb-2">error_outline</span>
      <p class="text-white/70">{{ error }}</p>
    </div>

    <!-- Posts -->
    <div v-else-if="posts.length" class="space-y-8">
      <article 
        v-for="post in posts" 
        :key="post._id"
        class="card card-hover overflow-hidden"
      >
        <!-- Featured Image -->
        <div v-if="post.mainImage" class="aspect-video overflow-hidden">
          <img 
            :src="post.mainImage"
            :alt="post.title"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div class="p-6">
          <!-- Title -->
          <h2 class="text-xl sm:text-2xl font-semibold mb-2 line-clamp-2">
            {{ post.title }}
          </h2>

          <!-- Meta -->
          <div class="flex flex-wrap gap-3 text-sm text-white/60 mb-4">
            <span v-if="post.author">
              By {{ post.author.name }}
            </span>
            <span>{{ getCategory(post) }}</span>
            <time v-if="post.publishedAt" :datetime="post.publishedAt" class="text-white/50">
              {{ formatDate(post.publishedAt) }}
            </time>
          </div>

          <!-- Content -->
          <div 
            class="prose prose-invert prose-sm max-w-none"
            v-html="renderBody(post.body)"
          />
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="card p-12 text-center">
      <div class="text-5xl mb-4">📝</div>
      <p class="text-lg text-white/70 mb-2">No posts available yet.</p>
      <p class="text-white/50">Check back soon for new content!</p>
    </div>
  </div>
</template>

<style>
/* Prose styles for blog content */
.prose {
  @apply text-white/90 leading-relaxed;
}
.prose p {
  @apply mb-4;
}
.prose h1, .prose h2, .prose h3, .prose h4 {
  @apply font-semibold text-white mt-6 mb-3;
}
.prose a {
  @apply text-secondary underline hover:text-secondary-light transition-colors;
}
.prose ul, .prose ol {
  @apply ml-6 mb-4;
}
.prose li {
  @apply mb-1;
}
.prose blockquote {
  @apply border-l-4 border-secondary/50 pl-4 italic text-white/70;
}
</style>
