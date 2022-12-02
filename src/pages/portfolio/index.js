import cx from 'clsx'
import { Footer, Logo } from 'components'
import Head from 'next/head'
import Link from 'next/link'
import { getProjects } from 'util/firebase'
import h from './Header.module.scss'
import s from './index.module.scss'
import p from './ProjectBlock.module.scss'

export default function Portfolio({ projects }) {
    return <>
        <Head>
            <title>D7mtg | Portfolio</title>
        </Head>

        <Header />

        <div className={s.root}>
            {projects.map(p => <ProjectBlock key={p.slug} {...p} />)}
        </div>

        <Footer />
    </>
}


const Header = () => {
    return <div className={h.root}>
        <Link href="/">
            <Logo className={h.logo} />
        </Link>

        <div className={h.menu}>
            <a href="#" className={cx(h.item, h.current)}>Work</a>
            <a href="/contact" className={h.item}>Contact</a>
        </div>
    </div>
}

export const ProjectBlock = props => {
    const {
        slug,
        logo
    } = props

    return <Link href={process.env.NEXT_PUBLIC_PROJECT_URL_PREFIX + slug}>
        <div className={p.root}>
            <div className={p.imageContainer}>
                <picture>
                    {logo?.dark && <source srcSet={logo.dark} media="(prefers-color-scheme: dark)" />}
                    <img className={p.image} src={logo?.url} alt={logo?.alt} />
                </picture>
            </div>
        </div>
    </Link>
}

export const getStaticProps = async () => {
    let projects = await getProjects()
    projects = projects.filter(p => p.portfolioIndex >= 0)
    projects.sort((a, b) => a.portfolioIndex - b.portfolioIndex)

    return {
        props: {
            projects
        }
    }
}