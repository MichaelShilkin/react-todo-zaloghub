import { describe, expect, it } from 'vitest'
import { countActiveTodos, filterTodos } from './selectors'
import type { Todo } from './types'

const todos: Todo[] = [
  { id: '1', text: 'one', completed: false },
  { id: '2', text: 'two', completed: true },
  { id: '3', text: 'three', completed: false },
]

describe('filterTodos', () => {
  it('all возвращает все задачи', () => {
    expect(filterTodos(todos, 'all')).toEqual(todos)
  })

  it('active возвращает только невыполненные', () => {
    expect(filterTodos(todos, 'active').map((t) => t.id)).toEqual(['1', '3'])
  })

  it('completed возвращает только выполненные', () => {
    expect(filterTodos(todos, 'completed').map((t) => t.id)).toEqual(['2'])
  })
})

describe('countActiveTodos', () => {
  it('считает невыполненные задачи', () => {
    expect(countActiveTodos(todos)).toBe(2)
    expect(countActiveTodos([])).toBe(0)
  })
})
