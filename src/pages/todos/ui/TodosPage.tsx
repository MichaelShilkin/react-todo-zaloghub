import { useState } from 'react'
import { countActiveTodos, filterTodos, TodoList, useTodos } from '@/entities/todo'
import type { TodoFilter } from '@/entities/todo'
import { AddTodoForm } from '@/features/add-todo'
import { DeleteTodo } from '@/features/delete-todo'
import { FilterTodos } from '@/features/filter-todos'
import { ToggleTodo } from '@/features/toggle-todo'
import styles from './TodosPage.module.css'

const EMPTY_TEXT: Record<TodoFilter, string> = {
  all: 'No tasks yet. Add your first one!',
  active: 'No active tasks',
  completed: 'No completed tasks',
}

export function TodosPage() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()
  const [filter, setFilter] = useState<TodoFilter>('all')

  const visibleTodos = filterTodos(todos, filter)
  const activeCount = countActiveTodos(todos)

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Task List</h1>

      <section className={styles.card}>
        <AddTodoForm onAdd={addTodo} />

        <TodoList
          todos={visibleTodos}
          emptyText={EMPTY_TEXT[filter]}
          renderToggle={(todo) => (
            <ToggleTodo todo={todo} onToggle={toggleTodo} />
          )}
          renderActions={(todo) => (
            <DeleteTodo todo={todo} onDelete={removeTodo} />
          )}
        />

        <footer className={styles.footer}>
          <span className={styles.counter} aria-live="polite">
            Tasks left: {activeCount}
          </span>
          <FilterTodos value={filter} onChange={setFilter} />
        </footer>
      </section>
    </main>
  )
}
