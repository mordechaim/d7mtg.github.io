import s from './Section.module.scss'
import cx from 'clsx'

export const Section = ({ className, ...rest }) => {
    return <section className={cx(s.section, className)} {...rest} />
}