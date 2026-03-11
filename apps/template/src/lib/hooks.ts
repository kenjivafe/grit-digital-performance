import { useState, useEffect } from 'react'
import { apiClient, ApiResponse } from './api'

export interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApi<T>(apiCall: () => Promise<ApiResponse<T>>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

export function useOrganization() {
  return useApi(() => apiClient.getOrganization())
}

export function useCategories() {
  return useApi(() => apiClient.getCategories())
}

export function useEvents(category?: string) {
  return useApi(() => apiClient.getEvents(category))
}
