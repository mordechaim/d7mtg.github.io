import cx from 'clsx'
import { Spinner } from './Spinner'
import s from './Spinner.module.scss'

export const LoadingSpinner = ({ className, ...rest }) => {
    return <div className={cx(s.fullPage, className)} {...rest}>
        <Spinner />
    </div>
}