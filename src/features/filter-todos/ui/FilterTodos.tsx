import type { TodoFilter } from '@/entities/todo'
import { Button } from '@/shared/ui'
import styles from './FilterTodos.module.css'

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

interface FilterTodosProps {
  value: TodoFilter
  onChange: (filter: TodoFilter) => void
}

export function FilterTodos({ value, onChange }: FilterTodosProps) {
  return (
    <div className={styles.filters} role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => {
        const isSelected = filter.value === value
        return (
          <Button
            key={filter.value}
            variant={isSelected ? 'primary' : 'ghost'}
            aria-pressed={isSelected}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </Button>
        )
      })}
    </div>
  )
}
