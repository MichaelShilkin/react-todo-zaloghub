import type { ReactNode } from 'react'
import type { Todo } from '../model/types'
import { TodoItem } from './TodoItem'
import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  renderToggle: (todo: Todo) => ReactNode
  renderActions: (todo: Todo) => ReactNode
  emptyText: string
}

export function TodoList({
  todos,
  renderToggle,
  renderActions,
  emptyText,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggle={renderToggle(todo)}
          actions={renderActions(todo)}
        />
      ))}
    </ul>
  )
}
