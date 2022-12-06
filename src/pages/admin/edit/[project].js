import { ProjectEditor } from 'components'
import { getProject, getProjects } from 'utils/backend'
import { protect } from 'utils/protect'


function Edit({ project }) {
    return <ProjectEditor project={project} />
}

export default protect(Edit)

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