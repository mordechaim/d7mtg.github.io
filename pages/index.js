import { Banner } from 'components/home/Banner';
import Link from 'next/link';
import { Footer } from '../components/Footer';
import { HomeProject } from '../components/home/HomeProject';
import { getProjects } from '../util/firebase';
import s from './index.module.scss';

export default function Home({ projects }) {
    return <div className={s.root}>
        <Banner />
        <div className={s.projectsContainer}>
            {projects.map(p => <HomeProject key={p.slug} {...p} />)}
        </div>

        <div className={s.moreProjects}>
            <Link className={s.button} href='/portfolio'>
                <i className="fa-solid fa-rectangle-vertical-history"></i>
                &nbsp;&nbsp;More projects
            </Link>
        </div>

        <Footer className={s.footer} />
    </div>
}

export const getStaticProps = async () => {
    return {
        props: {
            projects: await getProjects()
        }
    }
}