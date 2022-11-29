import { Banner } from 'components/home/Banner';
import Footer from '../components/home/Footer';
import { HomeProject } from '../components/home/HomeProject';
import { getProjects } from '../util/firebase';
import s from './index.module.scss';

export default function Home({ projects }) {
    return <div className={s.root}>
        <Banner />
        <div className={s.projectsContainer}>
            {projects.map(p => <HomeProject key={p.slug} {...p} />)}
        </div>
        <Footer />
    </div>
}

export const getStaticProps = async () => {
    const projects = await getProjects()

    return {
        props: {
            projects
        }
    }
}