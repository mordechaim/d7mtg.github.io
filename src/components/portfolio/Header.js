
import cx from 'clsx'
import { Logo } from 'components/Logo'
import Link from 'next/link'
import s from './Header.module.scss'

export const Header = () => {
    return <div className={s.root}>
        <Link href="/">
            <Logo className={s.logo} />
        </Link>

        <div className={s.menu}>
            <a href="#" className={cx(s.item, s.current)}>Work</a>
            <a href="/contact" className={s.item}>Contact</a>
        </div>
    </div>
}