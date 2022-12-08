import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, NumberField, Switch } from 'components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { deleteProject, getProjects, revalidate, setProject } from 'utils/backend'
import { protect } from 'utils/protect'
import s from './admin.module.scss'

function Admin({ projects: initialProjects }) {
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            projects: initialProjects
        }
    })

    const { control, register, handleSubmit, reset, formState: { isDirty } } = form
    const [publishing, setPublishing] = useState(false)

    const submitOrder = async ({ projects }) => {
        setPublishing(true)

        const toRevalidate = []

        for (const p of projects) {

            const initial = initialProjects.find(ip => ip.slug === p.slug)
            if (!initial)
                continue

            if (p.homeVisible !== initial.homeVisible ||
                p.portfolioVisible !== initial.portfolioVisible ||
                p.homeIndex !== initial.homeIndex ||
                p.portfolioIndex !== initial.portfolioIndex) {

                await setProject(p.slug, {
                    ...p,
                    homeIndex: Number(p.homeIndex),
                    portfolioIndex: Number(p.portfolioIndex)
                })
                toRevalidate.push(p)
            }
        }

        for (const toDelete of initialProjects) {
            if (!projects.find(p => p.slug === toDelete.slug)) {
                await deleteProject(toDelete.slug)
                toRevalidate.push(toDelete.slug)
            }
        }

        revalidate({
            projects: toRevalidate,
            home: true,
            portfolio: true,
            notFound: true
        })

        setPublishing(false)
        router.replace(router.asPath)
        reset({ projects })
    }

    const handleDiscard = e => {
        reset()
    }

    const { fields, remove } = useFieldArray({
        name: 'projects',
        control
    })

    return <form className={s.form} onSubmit={handleSubmit(submitOrder)}>
        <Head>
            <title>Admin | Dashboard</title>
        </Head>
        <div className={s.topBar}>
            <h1>{initialProjects.length} Project{initialProjects.length === 1 ? '' : 's'}</h1>

            {isDirty && <Button type='button' variant='secondary' onClick={handleDiscard}>
                Discard
            </Button>}
            {isDirty && <Button type='submit'>
                Publish{publishing && 'ing...'}
            </Button>}
            {!isDirty && <Button type='button' variant='secondary' onClick={e => router.push('/admin/new')}>
                <FontAwesomeIcon icon='add' />&nbsp;&nbsp;&nbsp;New Project
            </Button>}
        </div>

        <div className={s.grid}>
            {fields.map((p, index) => {
                return <Fragment key={p.id}>
                    <img src={p.logo?.url} alt={p.logo?.alt} width={100} />
                    <span>{p.name}</span>
                    <Switch {...register(`projects.${index}.homeVisible`)} label='Home' />
                    <Switch {...register(`projects.${index}.portfolioVisible`)} label='Portfolio' />
                    <NumberField {...register(`projects.${index}.homeIndex`)} label='Home position' />
                    <NumberField {...register(`projects.${index}.portfolioIndex`)} label='Portfolio position' />

                    <Button variant='icon' disabled={isDirty} type='button' onClick={e => router.push('/admin/edit/' + p.slug)}>
                        <FontAwesomeIcon icon={['fal', 'edit']} />
                    </Button>
                    <Button variant='icon' type='button' onClick={e => remove(index)}>
                        <FontAwesomeIcon icon={['fal', 'trash']} />
                    </Button>
                </Fragment>
            })}
        </div>
    </form>
}

export default protect(Admin)

export const getServerSideProps = async () => {
    const projects = await getProjects()

    return {
        props: {
            projects
        }
    }
}