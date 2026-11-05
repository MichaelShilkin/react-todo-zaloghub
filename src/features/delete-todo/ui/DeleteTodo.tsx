import type { Todo } from '@/entities/todo'
import { Button } from '@/shared/ui'

interface DeleteTodoProps {
  todo: Todo
  onDelete: (id: string) => void
}

export function DeleteTodo({ todo, onDelete }: DeleteTodoProps) {
  return (
    <Button
      variant="danger"
      onClick={() => onDelete(todo.id)}
      aria-label={`Delete task: ${todo.text}`}
    >
      Delete
    </Button>
  )
}
