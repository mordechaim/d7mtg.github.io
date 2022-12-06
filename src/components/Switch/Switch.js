import { forwardRef } from 'react'
import cx from 'clsx'
import s from './Switch.module.scss'

export const Switch = forwardRef(({ className, label, ...rest }, ref) => {
    return <label className={cx(s.switch, className)}>
        <input type='checkbox' ref={ref} {...rest} />
        <div className={s.toggle}>
            <div className={s.thumb} />
        </div>
        {label}
    </label>
})