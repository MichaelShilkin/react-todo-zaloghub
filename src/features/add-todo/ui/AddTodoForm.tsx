import { useState } from 'react'
import type { FormEvent } from 'react'
import { normalizeTodoText } from '@/entities/todo'
import { Button, Input } from '@/shared/ui'
import styles from './AddTodoForm.module.css'

interface AddTodoFormProps {
  onAdd: (text: string) => boolean
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState('')

  const isEmpty = normalizeTodoText(value) === null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (onAdd(value)) {
      setValue('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task text"
        autoFocus
      />
      <Button type="submit" disabled={isEmpty}>
        Add
      </Button>
    </form>
  )
}
