import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from 'components'
import { IconField } from 'components/ProjectEditor/IconField'
import { schema } from 'components/ProjectEditor/schema'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { setProject } from 'utils/backend'
import { ColorPickerController } from './ColorPickerController'
import { ImageArrayController } from './ImageArrayController'
import { ImageController } from './ImageController'
import s from './ProjectEditor.module.scss'
import cs from './common.module.scss'
import { RemoveButton } from './RemoveButton'
import { Section } from './Section'

const defaultValue = {
    homeVisible: true,
    portfolioVisible: true,
    homeIndex: 0,
    portfolioIndex: 0
}


export const ProjectEditor = ({ project }) => {
    const form = useForm({
        defaultValues: project ?? defaultValue,
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState: { errors, isDirty } } = form
    const [publishing, setPublishing] = useState(false)

    const submitProject = async value => {
        setPublishing(true)
        await setProject(value.slug, value)
        setPublishing(false)
    }

    return <FormProvider {...form}>
        <form className={s.root} onSubmit={handleSubmit(submitProject)}>
            <div className={s.topBar}>
                <h1>{project?.name ?? 'New Project'}</h1>

                {isDirty && <Button type='submit'>
                    Publish{publishing && 'ing...'}
                </Button>}
            </div>

            <Section>

                <h3>Overview</h3>

                <div className={cs.fields}>
                    <TextField label='Project name' {...register('name')} error={errors.name} />
                    <TextField label='Subtitle' {...register('subtitle')} error={errors.subtitle} />
                    <TextField label='Slug' {...register('slug')} error={errors.slug} readOnly={Boolean(project)} disabled={Boolean(project)} />
                    <ColorPickerController name='theme' label='Theme' />
                </div>

                <Labels />

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Meta description' area  {...register('metaDescription')} error={errors.theme} />
                </div>

                <div className={cs.fields}>
                    <ImageController name='logo' label='Logo' />
                    <ImageController name='logoDark' label='Logo dark mode' />
                    <ImageController name='previewImage' label='OG Preview' />
                </div>
            </Section>

            <Section>

                <h3>Home page</h3>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Description' area  {...register('homeDescription')} error={errors.homeDescription} />
                </div>

                <ImageController name='banner' label='Banner Photo' />

            </Section>

            <Section>
                <h3>Project page</h3>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Project description' area  {...register('projectDescription')} error={errors.projectDescription} />
                </div>

                <Links />
                <ImageArrayController name='images' label='Project Images' />


            </Section>
        </form>
    </FormProvider>
}

const Labels = () => {
    const { control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'labels',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={s.labels}>
            <TextField label={index === 0 && 'Deliverable'} {...register(`labels.${index}.text`)} error={errors.labels?.[index]?.text} />
            <IconField label={index === 0 && 'Icon'} name={`labels.${index}`} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            text: '',
            variant: 'fal',
            icon: ''
        })}>
            Add Deliverable
        </Button>
    </>
}


const Links = () => {
    const { control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={s.labels}>
            <TextField label={index === 0 && 'External URL'} {...register(`links.${index}.url`)} error={errors.links?.[index]?.url} />
            <TextField label={index === 0 && 'Text'} {...register(`links.${index}.text`)} error={errors.links?.[index]?.text} />
            <IconField label={index === 0 && 'Icon'} name={`links.${index}`} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            url: '',
            variant: 'fal',
            icon: ''
        })}>
            Add External Link
        </Button>
    </>
}


