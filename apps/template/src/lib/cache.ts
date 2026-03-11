interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

class SimpleCache {
  private cache = new Map<string, CacheItem<unknown>>()

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  // Clean up expired items
  cleanup(): void {
    for (const [key, item] of this.cache.entries()) {
      if (Date.now() - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = new SimpleCache()

// Cached API wrapper
export function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    // Try to get from cache first
    const cached = cache.get<T>(key)
    if (cached !== null) {
      resolve(cached)
      return
    }

    try {
      // Fetch fresh data
      const data = await fetcher()
      cache.set(key, data, ttl)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
