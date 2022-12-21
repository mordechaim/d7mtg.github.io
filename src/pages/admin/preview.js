import { LoadingSpinner, Separator } from 'components'
import { HomeProject } from 'pages'
import { usePreview } from 'utils/preview'
import { ProjectBlock } from 'pages/portfolio'
import { Blog } from 'pages/portfolio/projects/[project]'
import s from './preview.module.scss'

export default function Preview() {
    const data = usePreview()

    if (!data)
        return <LoadingSpinner />

    return <div className={s.preview}>
        {data.slug && data.logo && <>
            <h2>Portfolio Icon</h2>
            <ProjectBlock {...data} />
            <Separator />
        </>}
        {data.slug && data.theme && data.banner && <>
            <h2>Home Banner</h2>
            <HomeProject {...data} />
            <Separator />
        </>}
        {data.name && <>
            <h2>Project</h2>
            <Blog {...data} />
        </>}
    </div>
}