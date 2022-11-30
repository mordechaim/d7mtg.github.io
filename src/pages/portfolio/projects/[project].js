
import { Logo } from 'components/Logo'
import Head from 'next/head'
import Link from 'next/link'
import { getProject, getProjects } from 'util/firebase'
import s from './project.module.scss'
import LightGallery from 'lightgallery/react'

export default function Project({ project }) {
    const {
        name,
        metaDescription,
        previewImage,
        projectDescription,
        logo,
        labels,
        images,
        links
    } = project

    return <>
        <Head>
            <title>{name + ' | Project by D7mtg'}</title>
            <meta content={`D7mtg | ${name}`} property="og:title" />
            <meta content={metaDescription} property="og:description" />
            <meta name="description" content={metaDescription} />
            <meta content={previewImage} property="og:image" />
        </Head>

        <div className={s.logoContainer} >
            <Link href='/'>
                <Logo className={s.logo} />
            </Link>
        </div>
        <div className={s.line} />

        <div className={s.blog}>
            <h1>
                <Link id="back" href="/portfolio">
                    <i className="fal fa-chevron-left" />
                </Link>
                &nbsp;{name}
            </h1>
            <div className={s.labels}>
                {labels?.map(({ text, icon }) => <label key={text}><i className={`fa-light fa-${icon}`} />{text}</label>)}
            </div>
            <p >{projectDescription}</p>
            {links.length && <div className={s.links}>
                {links.map(l => <a key={l.url} className={s.button} href={l.url}>
                    <i className={`far fa-${l.icon}`} />
                    &nbsp;&nbsp;{l.text}
                </a>)}
            </div>}

        </div>
        <LightGallery
            licenseKey='E6B71A52-081F42BE-9A18C3F9-82A1B717'
            speed={200}
            download={false}
            getCaptionFromTitleOrAlt={false}
            mousewheel>
            <img className={s.allphotos} src={logo?.url} alt={logo?.alt} />

            {images.map(i => <img key={i.url} className={s.allphotos} src={i.url} alt={i.alt} />)}
        </LightGallery>
    </>
}


export const getStaticPaths = async () => {
    const projects = await getProjects()

    return {
        paths: projects.map(p => ({
            params: {
                project: p.slug
            }
        })),
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const { project } = params

    return {
        props: {
            project: await getProject(project)
        }
    }
}