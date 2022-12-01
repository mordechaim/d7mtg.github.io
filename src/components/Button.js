import cx from 'clsx'
import { forwardRef } from 'react'
import s from './Button.module.scss'

export const Button = forwardRef(({ className, ...rest }, ref) => {
    return <button ref={ref} className={cx(s.button, className)} {...rest} />
})