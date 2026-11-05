import { describe, expect, it } from 'vitest'
import { normalizeTodoText } from './text'

describe('normalizeTodoText', () => {
  it('отклоняет пустую строку', () => {
    expect(normalizeTodoText('')).toBeNull()
  })

  it('отклоняет строку из одних пробельных символов', () => {
    expect(normalizeTodoText('   ')).toBeNull()
    expect(normalizeTodoText('\t \n')).toBeNull()
  })

  it('обрезает пробелы по краям', () => {
    expect(normalizeTodoText('  купить молоко  ')).toBe('купить молоко')
  })

  it('сохраняет пробелы внутри текста', () => {
    expect(normalizeTodoText('a  b')).toBe('a  b')
  })
})
