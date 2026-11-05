import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  const classes = [styles.input, className].filter(Boolean).join(' ')

  return <input className={classes} {...rest} />
}
