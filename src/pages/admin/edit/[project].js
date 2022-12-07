import { ProjectEditor } from 'components'
import Head from 'next/head'
import { getProject } from 'utils/backend'
import { protect } from 'utils/protect'


function Edit({ project }) {
    return <>
        <Head>
            <title>{'Admin | ' + project.name}</title>
        </Head>
        <ProjectEditor project={project} />
    </>
}

export default protect(Edit)

export const getServerSideProps = async ({ params }) => {
    const { project } = params
    const result = await getProject(project)

    if (!result)
        return {
            notFound: true
        }

    return {
        props: {
            project: result
        }
    }
}