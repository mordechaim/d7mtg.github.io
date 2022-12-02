import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer, Logo } from 'components'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getProjects } from 'util/firebase'
import b from './Banner.module.scss'
import p from './HomeProject.module.scss'
import s from './index.module.scss'

export default function Home({ projects }) {
    return <>
        <Banner />
        <div className={s.projectsContainer}>
            {projects.map(p => <HomeProject key={p.slug} {...p} />)}
        </div>

        <div className={s.moreProjects}>
            <Link className={s.button} href='/portfolio'>
                <FontAwesomeIcon icon={['fas', 'rectangle-vertical-history']} />
                &nbsp;&nbsp;More projects
            </Link>
        </div>

        <Footer className={s.footer} />
    </>
}


const Banner = () => {
    return <div className={b.banner}>

        <div className={b.topbar}>
            <Logo className={b.logo} black />
            <div className={b.menu}>
                <Link href="/portfolio" className={b.item}>Work</Link>
                <Link href="/contact" className={b.item}>Contact</Link>
            </div>
        </div>

        <p className={b.header}>
            A branding and web agency in Brooklyn.
            <br /><br />
            <span className={b.subheader}>D7mtg helps founders build brands that are memorable by design.</span>
        </p>
        <div className={b.scrollDown}>
            <FontAwesomeIcon icon={['fas', 'arrow-down']}/>
            <p>Keep scrolling</p>
        </div>
    </div>
}

const HomeProject = props => {
    const {
        theme,
        logo,
        banner,
        name,
        subtitle,
        homeDescription,
        labels,
        slug
    } = props

    // use IntersectionObserver to change theme while scrolling
    const [intersecting, setIntersecting] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const options = {
            rootMargin: '0px 0px -100% 0px',
            threshold: 0
        }

        const observer = new IntersectionObserver(e => {
            setIntersecting(e[0].isIntersecting)
        }, options)

        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])


    return <>
        <Head>
            {intersecting && <meta name="theme-color" content={theme} />}
        </Head>

        <div ref={ref} className={p.project} style={{
            backgroundImage: `linear-gradient(161deg, ${theme}, #00000000), url(${banner})`,
            backgroundColor: theme
        }}>

            <div className={p.innerContainer}>
                <img className={p.logo} src={logo?.url} alt={logo?.alt} />
                <h3>{name}</h3>
                <h4>{subtitle}</h4>
                <div className={p.labelContainer}>
                    {labels?.map(({ text, icon, variant = 'fal' }) => <label key={text}>
                        <FontAwesomeIcon icon={[variant, icon]} />&nbsp;{text}
                    </label>)}
                </div>
                <p className={p.description}>{homeDescription}</p>
                <Link className={p.link} href={process.env.NEXT_PUBLIC_PROJECT_URL_PREFIX + slug}>
                    View project <FontAwesomeIcon icon={['fal', 'arrow-right']} />
                </Link>
            </div>
        </div>
    </>
}



export const getStaticProps = async () => {
    let projects = await getProjects()
    projects = projects.filter(p => p.homeIndex >= 0)
    projects.sort((a, b) => a.homeIndex - b.homeIndex)

    return {
        props: {
            projects
        }
    }
}