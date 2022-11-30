import Link from 'next/link'
import { Logo } from 'components/Logo'
import s from './Banner.module.scss'

export const Banner = () => {
    return <div className={s.banner}>

        <div className={s.topbar}>
            <Logo className={s.logo} />
            <div className={s.menu}>
                <Link href="/portfolio" className={s.item}>Work</Link>
                <Link href="/contact" className={s.item}>Contact</Link>
            </div>
        </div>

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