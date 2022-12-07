import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ColorPicker, ImageUpload, Separator, TextField } from 'components'
import { IconField } from 'components/ProjectEditor/IconField'
import { schema } from 'components/ProjectEditor/schema'
import { useState } from 'react'
import { Controller, FormProvider, get, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { setProject } from 'utils/backend'
import s from './ProjectEditor.module.scss'

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

                <Button type='submit' disabled={!isDirty}>
                    Publish{publishing && 'ing...'}
                </Button>
            </div>

            <div className={s.formContent} >
                <h3>Overview</h3>

                <div className={s.fields}>
                    <TextField label='Project name' {...register('name')} error={errors.name} />
                    <TextField label='Subtitle' {...register('subtitle')} error={errors.subtitle} />
                    <TextField label='Slug' {...register('slug')} error={errors.slug} readOnly={Boolean(project)} disabled={Boolean(project)} />
                    <ColorPickerController name='theme' label='Theme' />
                </div>

                <Labels />
                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Meta description' area  {...register('metaDescription')} error={errors.theme} />
                </div>


                <div className={s.fields}>
                    <ImageController name='logo' label='Logo' />
                </div>
                <div className={s.fields}>
                    <ImageController name='logoDark' label='Logo dark mode' />
                </div>
                <div className={s.fields}>
                    <ImageController name='previewImage' label='OG Preview' />
                </div>


                <Separator />

                <h3>Home page</h3>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Description' area  {...register('homeDescription')} error={errors.homeDescription} />
                </div>

                <div className={s.fields}>
                    <ImageController name='banner' label='Banner Photo' />
                </div>

                <Separator />

                <h3>Project page</h3>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Project description' area  {...register('projectDescription')} error={errors.projectDescription} />
                </div>

                <Links />
                <ProjectImages />


            </div>
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
        {fields.map((f, index) => <div key={f.id} className={index === 0 ? s.fields : s.labels}>
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
        {fields.map((f, index) => <div key={f.id} className={index === 0 ? s.fields : s.links}>
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

const ProjectImages = () => {
    const { control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'images',
        control
    })

    const handleUploadImage = result => {
        append({
            url: result.url,
            name: result.name,
            id: result.id,
            width: result.width,
            height: result.height,
            alt: result.name,
        })
    }

    return <>
        <ImageUpload className={s.upload} onUploadComplete={handleUploadImage} multiple label='Project images' />
        {fields.map((f, index) => <div key={f.id} className={s.attachment}>
            <div className={s.thumbnail}>
                <a href={f.url} target='_blank'>
                    <img src={f.url} href={f.url} height={75} alt={f.alt} />
                </a>
            </div>
            <TextField className={s.full} label={index === 0 && 'Alt text'} {...register(`images.${index}.alt`)} error={errors.images?.[index]?.alt} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
    </>
}

const RemoveButton = props => {
    return <Button className={s.remove} type='button' variant='secondary' {...props}>
        <FontAwesomeIcon icon={['fal', 'trash']} />
    </Button>
}

const ColorPickerController = ({ control, name, ...rest }) => {
    return <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => <ColorPicker {...field} error={error}  {...rest} />}
    />
}

const ImageController = ({ name, ...rest }) => {
    const { register, setValue, watch, formState: { errors } } = useFormContext()
    const handleUploadImage = result => {
        setValue(name, {
            url: result.url,
            name: result.name,
            id: result.id,
            width: result.width,
            height: result.height,
            alt: result.name,
        })
    }

    const value = watch(name)

    return <>
        <ImageUpload onUploadComplete={handleUploadImage} error={get(errors, name)} {...rest} />
        {value && <div className={s.attachment}>
            <div className={s.thumbnail}>
                <a href={value.url} target='_blank'>
                    <img src={value.url} href={value.url} height={75} alt={value.alt} />
                </a>
            </div>
            <TextField className={s.full} label='Alt text' {...register(`${name}.alt`)} error={get(errors, name + '.alt')} />
        </div>}
    </>
}