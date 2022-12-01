import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/Button'
import { TextField } from 'components/TextField'
import { useFieldArray, useForm } from 'react-hook-form'
import { getProject, getProjects, setProject } from 'util/firebase'
import * as yup from 'yup'
import s from './edit.module.scss'
import { Separator } from 'components/Separator'
import { protect } from 'util/protect'
import { useState } from 'react'

const schema = yup.object({
    name: yup.string().required(),
    subtitle: yup.string().required(),
    labels: yup.array().of(yup.object({
        text: yup.string().required(),
        variant: yup.string().matches(/fa[rbsl]/).required(),
        icon: yup.string().required()
    })),
    slug: yup.string().matches(/[a-z0-9\-]+/).required(),
    theme: yup.string().matches(/#[A-Fa-f0-9]{6}/).required(),
    metaDescription: yup.string().required(),
    projectDescription: yup.string().required(),
    links: yup.array().of(yup.object({
        url: yup.string().url().required(),
        text: yup.string().required(),
        variant: yup.string().matches(/fa[rbsl]/).required(),
        icon: yup.string().required()
    }))
})

function Edit({ project: initialValue }) {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });

    const [publishing, setPublishing] = useState(false)
    const [result, setResult] = useState()

    const submitProject = async value => {
        setPublishing(true)
        setResult(await setProject(value.slug, value))
        setPublishing(false)
    }

    return <form className={s.root} onSubmit={handleSubmit(submitProject)}>
        <div className={s.topBar}>
            <h1>{initialValue?.name ?? 'New Project'}</h1>
        </div>

        <div className={s.formContent} >
            <h3>Overview</h3>

            <div className={s.fields}>
                <TextField label='Project name' {...register('name')} error={errors.name} />
                <TextField label='Subtitle' {...register('subtitle')} error={errors.subtitle} />
            </div>
            <Labels control={control} register={register} errors={errors} />
            <div className={s.fields}>
                <TextField label='Slug' {...register('slug')} error={errors.slug} readOnly={Boolean(initialValue)} disabled={Boolean(initialValue)} />
                <TextField label='Theme' {...register('theme')} error={errors.theme} />
            </div>

            <div className={s.areaContainer}>
                <TextField className={s.area} label='Meta description' area  {...register('metaDescription')} error={errors.theme} />
            </div>

            <Separator />

            {/* 
            <div className={s.fields}>
                <TextField type='file' label='Project logo' accept={['.png', '.jpeg', '.jpg', '.webp']} />
                <TextField type='file' label='OG preview image' accept={['.png', '.jpeg', '.jpg', '.webp']} />
            </div>
            */}

            <h3>Project page</h3>

            <div className={s.areaContainer}>
                <TextField className={s.area} label='Project description' area  {...register('projectDescription')} error={errors.projectDescription} />
            </div>

            <Links control={control} register={register} errors={errors} />

            <Separator />

            <h3>Home page</h3>
            <div className={s.areaContainer}>
                <TextField className={s.area} label='Description' area  {...register('homeDescription')} error={errors.homeDescription} />
            </div>
        </div>

        <div className={s.bottomBar}>
            <span>{publishing && 'Publishing...'}</span>
            <Button type='submit'>Publish</Button>
        </div>
    </form>
}

const Labels = ({ control, register, errors }) => {
    const { fields, append, remove } = useFieldArray({
        name: 'labels',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={s.labels}>
            <TextField label={index === 0 && 'Deliverable'} {...register(`labels.${index}.text`)} error={errors.labels?.[index]?.text} />
            <TextField label={index === 0 && 'Icon Variant'} {...register(`labels.${index}.variant`)} error={errors.labels?.[index]?.variant} />
            <TextField label={index === 0 && 'Icon'} {...register(`labels.${index}.icon`)} error={errors.labels?.[index]?.icon} />
            <Button className={s.remove} type='button' onClick={e => remove(index)}>
                Remove
            </Button>
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            text: '',
            variant: '',
            icon: ''
        })}>
            Add
        </Button>
    </>
}


const Links = ({ control, register, errors }) => {
    const { fields, update, append, remove } = useFieldArray({
        name: 'links',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={s.links}>
            <TextField label={index === 0 && 'External URL'} {...register(`links.${index}.url`)} error={errors.links?.[index]?.url} />
            <TextField label={index === 0 && 'Text'} {...register(`links.${index}.text`)} error={errors.links?.[index]?.text} />
            <TextField label={index === 0 && 'Icon Variant'} {...register(`links.${index}.variant`)} error={errors.links?.[index]?.variant} />
            <TextField label={index === 0 && 'Icon'} {...register(`links.${index}.icon`)} error={errors.links?.[index]?.icon} />
            <Button className={s.remove} type='button' onClick={e => remove(index)}>
                Remove
            </Button>
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            url: '',
            variant: '',
            icon: ''
        })}>
            Add
        </Button>
    </>
}

export default protect(Edit)


export const getStaticPaths = async () => {
    const projects = await getProjects()

    return {
        paths: [
            {
                params: { project: [] }
            },
            ...projects.map(p => ({
                params: {
                    project: [p.slug]
                }
            }))
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const { project: array } = params
    let project = null

    if (array)
        project = await getProject(array[0])

    return {
        props: {
            project
        }
    }
}