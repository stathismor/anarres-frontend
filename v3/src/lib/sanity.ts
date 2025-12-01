import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'

const PROJECT_ID = 'qxvbgi0p'
const DATASET = 'production'
const API_VERSION = '2022-03-07'

// Create client for image URL builder
export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

// Blog post types
export interface Author {
  name: string
}

export interface Category {
  title: string
}

export interface BlogPost {
  _id: string
  title: string
  publishedAt: string
  body: unknown[]
  author: Author | null
  categories: Category[]
  mainImage: string | null
}

// Fetch blog posts using native fetch to avoid client issues
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    body,
    "author": author->{name},
    "categories": categories[]->{title},
    "mainImage": mainImage.asset->url
  }`
  
  const encodedQuery = encodeURIComponent(query)
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodedQuery}`
  
  console.log('[Sanity] Fetching from:', url)
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('[Sanity] Fetch successful, got', data.result?.length || 0, 'posts')
    return data.result || []
  } catch (error) {
    console.error('[Sanity] Fetch failed:', error)
    throw error
  }
}
