import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import { schedule as staticSchedule, mixcloudLinks as staticMixcloudLinks, type DaySchedule } from '@/data/schedule'

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

// Helper to fetch from Sanity API
async function sanityFetch<T>(query: string): Promise<T> {
  const encodedQuery = encodeURIComponent(query)
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodedQuery}`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  
  const data = await response.json()
  return data.result
}

// ============================================
// Blog Posts
// ============================================

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
  
  console.log('[Sanity] Fetching blog posts...')
  
  try {
    const posts = await sanityFetch<BlogPost[]>(query)
    console.log('[Sanity] Got', posts?.length || 0, 'posts')
    return posts || []
  } catch (error) {
    console.error('[Sanity] Blog fetch failed:', error)
    throw error
  }
}

// ============================================
// Schedule
// ============================================

export interface SanityBroadcast {
  _key: string
  time: string
  title: string
  tags?: string
  producer?: string
  mixcloudUrl?: string
  isLive?: boolean
}

export interface SanityDaySchedule {
  _id: string
  dayId: string
  dayName: string
  dayOrder: number
  broadcasts: SanityBroadcast[]
}

export interface ScheduleData {
  schedule: DaySchedule[]
  mixcloudLinks: Record<string, string>
  fromSanity: boolean
}

export async function fetchSchedule(): Promise<ScheduleData> {
  const query = `*[_type == "scheduleDay"] | order(dayOrder asc) {
    _id,
    dayId,
    dayName,
    dayOrder,
    broadcasts[] {
      _key,
      time,
      title,
      tags,
      producer,
      mixcloudUrl,
      isLive
    }
  }`
  
  console.log('[Sanity] Fetching schedule...')
  
  try {
    const sanityDays = await sanityFetch<SanityDaySchedule[]>(query)
    
    if (!sanityDays || sanityDays.length === 0) {
      console.log('[Sanity] No schedule found, using static data')
      return {
        schedule: staticSchedule,
        mixcloudLinks: staticMixcloudLinks,
        fromSanity: false
      }
    }
    
    // Build mixcloud links from Sanity data
    const mixcloudLinks: Record<string, string> = { ...staticMixcloudLinks }
    
    // Transform Sanity data to our format
    const schedule: DaySchedule[] = sanityDays.map(day => ({
      id: day.dayId,
      name: day.dayName,
      broadcasts: (day.broadcasts || []).map(b => {
        // Add mixcloud link if provided
        if (b.producer && b.mixcloudUrl) {
          const baseName = b.producer.replace(/\s*\(.*\)\s*$/, '')
          mixcloudLinks[baseName] = b.mixcloudUrl
        }
        
        return {
          time: b.time,
          title: b.title,
          tags: b.tags,
          producer: b.producer,
          isLive: b.isLive || false
        }
      })
    }))
    
    console.log('[Sanity] Got schedule for', schedule.length, 'days')
    
    return {
      schedule,
      mixcloudLinks,
      fromSanity: true
    }
  } catch (error) {
    console.warn('[Sanity] Schedule fetch failed, using static data:', error)
    return {
      schedule: staticSchedule,
      mixcloudLinks: staticMixcloudLinks,
      fromSanity: false
    }
  }
}
