import { useState, useCallback } from 'react'

export interface LoadingState {
  [key: string]: boolean
}

export const useLoading = (initialState: LoadingState = {}) => {
  const [loading, setLoading] = useState<LoadingState>(initialState)

  const setLoadingState = useCallback((key: string, isLoading: boolean) => {
    setLoading(prev => ({
      ...prev,
      [key]: isLoading
    }))
  }, [])

  const startLoading = useCallback((key: string) => {
    setLoadingState(key, true)
  }, [setLoadingState])

  const stopLoading = useCallback((key: string) => {
    setLoadingState(key, false)
  }, [setLoadingState])

  const isLoading = useCallback((key: string) => {
    return loading[key] || false
  }, [loading])

  const isAnyLoading = useCallback(() => {
    return Object.values(loading).some(Boolean)
  }, [loading])

  const resetLoading = useCallback(() => {
    setLoading({})
  }, [])

  return {
    loading,
    setLoadingState,
    startLoading,
    stopLoading,
    isLoading,
    isAnyLoading,
    resetLoading
  }
}

// Global loading hook for app-wide loading states
let globalLoadingState: LoadingState = {}
let globalLoadingListeners: Array<(state: LoadingState) => void> = []

const updateGlobalLoading = (newState: LoadingState) => {
  globalLoadingState = newState
  globalLoadingListeners.forEach(listener => listener(newState))
}

export const useGlobalLoading = () => {
  const [loading, setLoading] = useState<LoadingState>(globalLoadingState)

  const setGlobalLoadingState = useCallback((key: string, isLoading: boolean) => {
    const newState = {
      ...globalLoadingState,
      [key]: isLoading
    }
    updateGlobalLoading(newState)
  }, [])

  const startGlobalLoading = useCallback((key: string) => {
    setGlobalLoadingState(key, true)
  }, [setGlobalLoadingState])

  const stopGlobalLoading = useCallback((key: string) => {
    setGlobalLoadingState(key, false)
  }, [setGlobalLoadingState])

  const isGlobalLoading = useCallback((key: string) => {
    return loading[key] || false
  }, [loading])

  const isAnyGlobalLoading = useCallback(() => {
    return Object.values(loading).some(Boolean)
  }, [loading])

  // Subscribe to global loading changes
  useState(() => {
    const listener = (newState: LoadingState) => setLoading(newState)
    globalLoadingListeners.push(listener)
    
    return () => {
      globalLoadingListeners = globalLoadingListeners.filter(l => l !== listener)
    }
  })

  return {
    loading,
    setGlobalLoadingState,
    startGlobalLoading,
    stopGlobalLoading,
    isGlobalLoading,
    isAnyGlobalLoading
  }
}