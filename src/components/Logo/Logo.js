
import animation from 'assets/animations/d7mtg.json'
import Lottie from 'lottie-react'
import cx from 'clsx'
import s from './Logo.module.scss'

export const Logo = ({ black, className, ...rest }) => {
    return <Lottie animationData={animation} loop={false} className={cx(black && s.black, className)} {...rest} />
}