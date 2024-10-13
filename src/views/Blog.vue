<template>
  <div class="blog-container">
    <h1>Latest Blog Posts</h1>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>

    <!-- Blog posts section -->
    <div v-else>
      <div v-if="filteredPosts.length">
        <div v-for="post in filteredPosts" :key="post._id" class="blog-post">
          <!-- Main Image Section -->
          <div v-if="post.mainImage" class="main-image">
            <img
              :src="urlFor(post.mainImage)"
              alt="Main Image"
              class="blog-main-image"
            />
          </div>

          <h2>{{ post.title }}</h2>
          <p class="author">
            By {{ post.author ? post.author.name : 'Unknown Author' }}
          </p>
          <p class="category">Category: {{ getCategory(post) }}</p>

          <!-- Published date -->
          <p v-if="post.publishedAt" class="published">
            Published on: {{ formatDate(post.publishedAt) }}
          </p>
          <p v-else class="published">Publication date not available</p>

          <!-- Render Portable Text for Body content -->
          <div
            class="content"
            v-html="convertPortableTextToHtml(post.body)"
          ></div>
        </div>
      </div>

      <!-- No posts available message -->
      <div v-else>
        <p>No posts available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import sanityClient from '../sanity';
import { toHTML } from '@portabletext/to-html';
import imageUrlBuilder from '@sanity/image-url'; // Import imageUrlBuilder to handle images

// Initialize image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
function urlFor(source) {
  return builder.image(source).width(800).url();
}

export default {
  data() {
    return {
      posts: [],
      filteredPosts: [],
      loading: true, // Loading state
    };
  },
  created() {
    this.fetchBlogData(); // Fetch blog data when the component is created
  },
  methods: {
    // Fetch blog data from Sanity
    async fetchBlogData() {
      try {
        const posts = await sanityClient.fetch(
          `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            publishedAt,
            body,
            "author": author->{name},
            "categories": categories[]->{title},
            "mainImage": mainImage.asset->url // Assuming you have a mainImage field
          }`
        );

        console.log('Fetched posts:', posts);

        this.posts = posts;
        this.filteredPosts = posts;
      } catch (error) {
        console.error('Sanity fetch error:', error);
      } finally {
        this.loading = false;
      }
    },

    // Function to generate image URLs
    urlFor,

    // Get category or fallback to 'Uncategorized'
    getCategory(post) {
      return post.categories && post.categories.length > 0
        ? post.categories[0].title
        : 'Uncategorized';
    },

    // Format the published date
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    // Convert Portable Text (Sanity's rich text format) to HTML
    convertPortableTextToHtml(body) {
      if (!body) return ''; // Handle empty body
      return toHTML(body); // Convert Portable Text to HTML
    },
  },
};
</script>

<style scoped>
/* General Layout */
.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

/* Blog Post */
.blog-post {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.blog-post:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* Main Image */
.main-image {
  max-width: 50%;
  height: auto;
  display: block;
  margin: 20px auto;
}

.blog-main-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.author,
.category,
.published {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.published {
  color: #aaa;
}

/* Content */
.content {
  font-size: 18px;
  color: #444;
  line-height: 1.7;
  margin-top: 15px;
  text-align: left;
}

.content p {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Links in content */
.content a {
  color: #007bff;
  text-decoration: underline;
}

.content a:hover {
  color: #0056b3;
}

/* Loading state */
.loading {
  text-align: center;
  font-size: 18px;
  color: #777;
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
  }

  .blog-post {
    padding: 20px;
  }
}
</style>
