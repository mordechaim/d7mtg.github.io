import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from 'components/Footer'
import { Banner } from 'components/home/Banner'
import { HomeProject } from 'components/home/HomeProject'
import Link from 'next/link'
import { getProjects } from 'util/firebase'
import s from './index.module.scss'

export default function Home({ projects }) {
    return <div className={s.root}>
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
    </div>
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