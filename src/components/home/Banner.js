import Link from 'next/link'
import { Logo } from 'components/Logo'
import s from './Banner.module.scss'

export const Banner = () => {
    return <div className={s.banner}>

        <Logo className={s.logo} />

        <div className={s.menu}>
            <Link href="/portfolio" className={s.menuItem}>Work</Link>
            <Link href="/contact" className={s.menuItem}>Contact</Link>
        </div>

        <br />

        <p className={s.header}>
            A branding and web agency in Brooklyn.
            <br /><br />
            <span className={s.subheader}>D7mtg helps founders build brands that are memorable by design.</span>
        </p>
        <div className={s.scrollDown}>
            <i className="fas fa-arrow-down" />
            <p>Keep scrolling</p>
        </div>
    </div>
}