import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn('Upstash Redis not configured. Using in-memory fallback.')
}

export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

const PROJECTS_KEY = 'portfolio_projects'

let memoryProjects: any[] = []

export async function getProjects() {
  try {
    if (redis) {
      const data = await redis.get(PROJECTS_KEY)
      if (data) return Array.isArray(data) ? data : []
    }
  } catch (err) {
    console.error('Redis read error:', err)
  }
  return memoryProjects
}

export async function saveProjects(projects: any[]) {
  try {
    if (redis) {
      await redis.set(PROJECTS_KEY, projects)
      return true
    }
  } catch (err) {
    console.error('Redis write error:', err)
  }
  memoryProjects = projects
  return true
}
