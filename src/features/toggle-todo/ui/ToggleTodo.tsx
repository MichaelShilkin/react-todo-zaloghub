import type { Todo } from '@/entities/todo'
import { Checkbox } from '@/shared/ui'

interface ToggleTodoProps {
  todo: Todo
  onToggle: (id: string) => void
}

export function ToggleTodo({ todo, onToggle }: ToggleTodoProps) {
  return (
    <Checkbox
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
      aria-label={`Mark as completed: ${todo.text}`}
    />
  )
}
