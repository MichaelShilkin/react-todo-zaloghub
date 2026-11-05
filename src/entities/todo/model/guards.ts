import type { Todo } from './types'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false

  const todo = value as Record<string, unknown>
  return (
    typeof todo.id === 'string' &&
    typeof todo.text === 'string' &&
    typeof todo.completed === 'boolean'
  )
}

export function isTodoList(value: unknown): value is Todo[] {
  return Array.isArray(value) && value.every(isTodo)
}
