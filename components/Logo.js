
import animation from 'assets/animations/d7mtg.json'
import Lottie from 'lottie-react'

export const Logo = props => {
    return <Lottie animationData={animation} loop={false} {...props} />
}