import { Banner } from 'components/home/Banner';
import { get, getDatabase, ref } from 'firebase/database';
import Head from 'next/head';
import Footer from '../components/home/Footer';
import { HomeProject } from '../components/home/HomeProject';
import s from './index.module.scss'

export default function Home({ projects }) {
    return <>
        <Head>
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffd708" />
        </Head>

        <div className={s.root}>
            <Banner />
            <div className={s.projectsContainer}>
                {projects.map(p => <HomeProject key={p.slug} {...p} />)}
            </div>
            <Footer />
        </div>

    </>
}

export const getStaticProps = async () => {

    const db = getDatabase()
    const key = ref(db, 'projects')
    const projects = await get(key)

    const result = Object.values(projects.toJSON()).map(i => ({
        ...i,
        metaDescription: transformString(i.metaDescription),
        labels: Object.values(i.labels)
    }))

    return {
        props: {
            projects: result
        }
    }
}

const transformString = s => s.replaceAll('\\n', '\n').replaceAll('\\u00a0', '\u00a0')