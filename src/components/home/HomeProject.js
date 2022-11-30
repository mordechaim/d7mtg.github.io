import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './HomeProject.module.scss'

export const HomeProject = props => {
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

        <div ref={ref} className={s.project} style={{
            backgroundImage: `linear-gradient(161deg, ${theme}, #00000000), url(${banner})`,
            backgroundColor: theme
        }}>

            <div className={s.innerContainer}>
                <img className={s.logo} src={logo} alt={name + ' logo'} />
                <h3>{name}</h3>
                <h4>{subtitle}</h4>
                <div className={s.labelContainer}>
                    {labels?.map(({ text, icon }) => <label key={text}><i className={`fa-light fa-${icon}`} />{text}</label>)}
                </div>
                <p className={s.description}>{homeDescription}</p>
                <Link className={s.link} href={'/portfolio/projects/' + slug}>
                    View project <i className="fa-light fa-arrow-right" />
                </Link>
            </div>
        </div>
    </>


}