import type { ReactNode } from 'react'
import type { Todo } from '../model/types'
import styles from './TodoItem.module.css'

interface TodoItemProps {
  todo: Todo
  toggle: ReactNode
  actions: ReactNode
}

export function TodoItem({ todo, toggle, actions }: TodoItemProps) {
  const classes = [styles.item, todo.completed && styles.completed]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={classes}>
      {toggle}
      <span className={styles.text}>{todo.text}</span>
      <div className={styles.actions}>{actions}</div>
    </li>
  )
}
