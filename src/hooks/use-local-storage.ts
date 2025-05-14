import { useState, useEffect } from 'react'

/**
 * Custom React hook to manage localStorage with state synchronization.
 * @param key - The key to use for localStorage.
 * @param initialValue - The initial value to set if the key does not exist.
 * @returns [value, setValue] - The current value and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error writing to localStorage', error)
    }
  }

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error('Error syncing localStorage on mount', error)
    }
  }, [key])

  return [storedValue, setValue] as const
}