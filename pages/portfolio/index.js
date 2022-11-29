import { Footer } from 'components/Footer';
import { Header } from 'components/portfolio/Header';
import { ProjectBlock } from 'components/portfolio/ProjectBlock';
import Head from 'next/head';
import { getProjects } from 'util/firebase';
import s from './index.module.scss';

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

export const getStaticProps = async () => {
    return {
        props: {
            projects: await getProjects()
        }
    }
}