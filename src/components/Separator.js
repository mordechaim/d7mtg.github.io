import cx from 'clsx'
import s from './Separator.module.scss'

export const Separator = ({ vertical, className, ...rest }) => {
    return <div className={cx(s.root, vertical && s.vertical, className)} {...rest} />
}