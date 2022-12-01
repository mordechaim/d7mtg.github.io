import cx from 'clsx'
import { forwardRef } from 'react'
import s from './TextField.module.scss'

export const TextField = forwardRef(({ label, footer, error, className, area, ...rest }, ref) => {
    const Input = area ? 'textarea' : 'input'

    return <div className={cx(s.root, error && s.error, className)}>
        {label && <label className={s.header}>{label}</label>}
        <div className={s.container}>
            <Input {...rest} ref={ref} />
        </div>
        {footer && <label className={s.footer}>{footer}</label>}
    </div >
})