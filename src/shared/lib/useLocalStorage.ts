import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

function readStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return initialValue

    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    readStorage(key, initialValue, isValid),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      return
    }
  }, [key, value])

  return [value, setValue]
}
