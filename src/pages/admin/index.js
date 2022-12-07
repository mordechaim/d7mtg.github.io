import { protect } from 'utils/protect'
import s from './admin.module.scss'
import { getProjects } from 'utils/backend'
import Head from 'next/head'

function Admin({ projects }) {
    return <div className={s.root}>
        <Head>
            <title>Admin | Dashboard</title>
        </Head>
        <div className={s.header}>
            <h1>Projects</h1>
            <h3>{projects.length} Projects</h3>
        </div>
    </div>
}

export default protect(Admin)

export const getServerSideProps = async () => {
    return {
        props: {
            projects: await getProjects()
        }
    }
}