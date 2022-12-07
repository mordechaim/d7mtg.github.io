import { ProjectEditor } from 'components'
import Head from 'next/head'
import { protect } from 'utils/protect'

function New() {
    return <>
        <Head>
            <title>Admin | New Project</title>
        </Head>
        <ProjectEditor />
    </>
}

export default protect(New)