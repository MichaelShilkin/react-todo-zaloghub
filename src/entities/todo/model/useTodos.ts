import { useCallback } from 'react'
import { createId, useLocalStorage } from '@/shared/lib'
import { isTodoList } from './guards'
import { normalizeTodoText } from './text'
import type { Todo } from './types'

const STORAGE_KEY = 'zaloghub:todos'

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, [], isTodoList)

  const addTodo = useCallback(
    (rawText: string): boolean => {
      const text = normalizeTodoText(rawText)
      if (text === null) return false

      setTodos((prev) => [...prev, { id: createId(), text, completed: false }])
      return true
    },
    [setTodos],
  )

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      )
    },
    [setTodos],
  )

  const removeTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    },
    [setTodos],
  )

  return { todos, addTodo, toggleTodo, removeTodo }
}
