import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer, Logo } from 'components'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getProjects } from 'utils/backend'
import s from './index.module.scss'

export default function Home({ projects }) {
    return <>
        <Banner />
        <div className={s.projectsContainer}>
            {projects.map(p => <Project key={p.slug} {...p} />)}
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
    return <div className={s.banner}>

        <div className={s.topbar}>
            <Logo className={s.logo} black />
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
            <FontAwesomeIcon icon={['fas', 'arrow-down']} />
            <p>Keep scrolling</p>
        </div>
    </div>
}


import p from './Project.module.scss'

const Project = props => {
    const {
        theme,
        logo,
        banner,
        bannerMobile,
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


    let css =
        `#banner-${slug} {
            background-image: linear-gradient(161deg, ${theme}, #00000000), url(${banner.url});
            background-color: ${theme};
        }`

    if (bannerMobile) {
        css +=
            `
            @media (max-width: 900px) {
                #banner-${slug} {
                    background-image: linear-gradient(161deg, ${theme}, #00000000), url(${bannerMobile.url});
                } 
            }`
    }


    return <>
        <Head>
            {intersecting && <meta name="theme-color" content={theme} />}
            <style>{css}</style>
        </Head>
        <div ref={ref} className={p.project} id={'banner-' + slug}>
            <img className={p.logo} src={logo?.url} alt={logo?.alt} />
            <h3>{name}</h3>
            <h4>{subtitle}</h4>
            <div className={p.labelContainer}>
                {labels?.map(({ text, icon, variant }) => <label key={text}>
                    <FontAwesomeIcon icon={[variant, icon]} />&nbsp;{text}
                </label>)}
            </div>
            <p className={p.description}>{homeDescription}</p>
            <Link className={p.link} href={'/portfolio/projects/' + slug}>
                View project <FontAwesomeIcon icon={['fal', 'arrow-right']} />
            </Link>
        </div>
    </>
}



export const getStaticProps = async () => {
    let projects = await getProjects()
    projects = projects.filter(p => p.homeVisible)
    projects.sort((a, b) => a.homeIndex - b.homeIndex)

    return {
        props: {
            projects
        }
    }
}