import type { InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.css'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className, ...rest }: CheckboxProps) {
  const classes = [styles.checkbox, className].filter(Boolean).join(' ')

  return <input type="checkbox" className={classes} {...rest} />
}
