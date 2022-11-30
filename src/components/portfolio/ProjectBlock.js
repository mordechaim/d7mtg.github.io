import Link from 'next/link'
import s from './ProjectBlock.module.scss'

export const ProjectBlock = props => {
    const {
        slug,
        logo
    } = props

    return <Link href={'/portfolio/projects/' + slug}>
        <div className={s.root}>
            <div className={s.imageContainer}>
                <picture>
                    {logo?.dark && <source srcSet={logo.dark} media="(prefers-color-scheme: dark)" />}
                    <img className={s.image} src={logo?.url} alt={logo?.alt} />
                </picture>
            </div>
        </div>
    </Link>
}