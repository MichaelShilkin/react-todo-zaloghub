export function normalizeTodoText(raw: string): string | null {
  const text = raw.trim()
  return text === '' ? null : text
}
