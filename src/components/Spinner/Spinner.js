import animation from 'assets/animations/spinner.json'
import Lottie from 'lottie-react'
import cx from 'clsx'
import s from './Spinner.module.scss'

export const Spinner = ({ className, ...rest }) => {
    return <Lottie animationData={animation} loop className={cx(s.spinner, className)} {...rest} />
}