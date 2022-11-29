import Link from 'next/link'
import s from './ProjectBlock.module.scss'

export const ProjectBlock = props => {
    const {
        slug,
        logo,
        logoDark,
        logoAlt
    } = props

    return <Link href={'/portfolio/projects/' + slug}>
        <div className={s.root}>
            <div className={s.imageContainer}>
                <picture>
                    {logoDark && <source srcset={logoDark} media="(prefers-color-scheme: dark)" />}
                    <img className={s.image} src={logo} alt={logoAlt} />
                </picture>
            </div>
        </div>
    </Link>
}