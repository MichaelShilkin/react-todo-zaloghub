// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TodosPage } from './TodosPage'

const STORAGE_KEY = 'zaloghub:todos'

async function addTodo(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.type(screen.getByLabelText('New task text'), text)
  await user.click(screen.getByRole('button', { name: 'Add' }))
}

describe('TodosPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    cleanup()
  })

  it('добавляет задачу через поле ввода и кнопку', async () => {
    const user = userEvent.setup()
    render(<TodosPage />)

    await addTodo(user, '  Купить молоко  ')

    expect(screen.getByText('Купить молоко')).toBeTruthy()
    const input = screen.getByLabelText<HTMLInputElement>('New task text')
    expect(input.value).toBe('')
  })

  it('не даёт добавить пустую задачу или задачу из пробелов', async () => {
    const user = userEvent.setup()
    render(<TodosPage />)

    const button = screen.getByRole('button', { name: 'Add' })
    expect(button.hasAttribute('disabled')).toBe(true)

    const input = screen.getByLabelText('New task text')
    await user.type(input, '     ')
    expect(button.hasAttribute('disabled')).toBe(true)

    await user.type(input, '{Enter}')
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('[]')
  })

  it('переключает статус задачи и меняет её вид', async () => {
    const user = userEvent.setup()
    render(<TodosPage />)
    await addTodo(user, 'Задача')

    const checkbox = screen.getByRole<HTMLInputElement>('checkbox')
    expect(checkbox.checked).toBe(false)

    await user.click(checkbox)
    expect(checkbox.checked).toBe(true)

    const item = screen.getByRole('listitem')
    expect(item.className).toContain('completed')

    await user.click(checkbox)
    expect(item.className).not.toContain('completed')
  })

  it('удаляет задачу', async () => {
    const user = userEvent.setup()
    render(<TodosPage />)
    await addTodo(user, 'Удалить меня')

    await user.click(screen.getByRole('button', { name: /Delete task/ }))

    expect(screen.queryByText('Удалить меня')).toBeNull()
  })

  it('фильтрует: все / активные / выполненные', async () => {
    const user = userEvent.setup()
    render(<TodosPage />)
    await addTodo(user, 'Первая')
    await addTodo(user, 'Вторая')

    await user.click(
      screen.getByRole('checkbox', { name: /Mark as completed: Первая/ }),
    )

    const filters = within(screen.getByRole('group', { name: 'Filter tasks' }))

    await user.click(filters.getByRole('button', { name: 'Active' }))
    expect(screen.queryByText('Первая')).toBeNull()
    expect(screen.getByText('Вторая')).toBeTruthy()

    await user.click(filters.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('Первая')).toBeTruthy()
    expect(screen.queryByText('Вторая')).toBeNull()

    await user.click(filters.getByRole('button', { name: 'All' }))
    expect(screen.getByText('Первая')).toBeTruthy()
    expect(screen.getByText('Вторая')).toBeTruthy()
  })

  it('сохраняет задачи в localStorage и восстанавливает после перезагрузки', async () => {
    const user = userEvent.setup()
    const first = render(<TodosPage />)
    await addTodo(user, 'Переживу перезагрузку')
    await user.click(screen.getByRole('checkbox'))

    first.unmount()
    render(<TodosPage />)

    expect(screen.getByText('Переживу перезагрузку')).toBeTruthy()
    expect(screen.getByRole<HTMLInputElement>('checkbox').checked).toBe(true)
  })

  it('не падает на повреждённых данных в localStorage', () => {
    window.localStorage.setItem(STORAGE_KEY, '{не json')
    render(<TodosPage />)

    expect(screen.getByText('No tasks yet. Add your first one!')).toBeTruthy()
  })
})
