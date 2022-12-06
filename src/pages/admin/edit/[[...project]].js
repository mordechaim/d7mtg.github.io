import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ColorPicker, ImageUpload, Separator, Switch, TextField } from 'components'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, get, FormProvider, useFormContext } from 'react-hook-form'
import { getProject, getProjects, setProject } from 'utils/backend'
import { protect } from 'utils/protect'
import * as yup from 'yup'
import s from './edit.module.scss'

const imageSchema = () => yup.object({
    url: yup.string().url().required(),
    alt: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    id: yup.string().uuid().required()
})

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
    homeDescription: yup.string().required(),
    homeVisible: yup.boolean().required(),
    portfolioVisible: yup.boolean().required(),
    homeIndex: yup.number().required(),
    portfolioIndex: yup.number().required(),
    links: yup.array().of(yup.object({
        url: yup.string().url().required(),
        text: yup.string().required(),
        variant: yup.string().matches(/fa[rbsl]/).required(),
        icon: yup.string().required()
    })),
    images: yup.array().of(imageSchema()),
    logo: imageSchema().required(),
    logoDark: imageSchema(),
    previewImage: imageSchema(),
    banner: imageSchema().required()

})

function Edit({ project: initialValue }) {
    const form = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema)
    });
    const { register, handleSubmit, formState: { errors }, control } = form

    const [publishing, setPublishing] = useState(false)

    const submitProject = async value => {
        setPublishing(true)
        await setProject(value.slug, value)
        setPublishing(false)
    }

    return <FormProvider {...form}>
        <form className={s.root} onSubmit={handleSubmit(submitProject)}>
            <div className={s.topBar}>
                <h1>{initialValue?.name ?? 'New Project'}</h1>

                <Button type='submit'>
                    Publish{publishing && 'ing...'}
                </Button>
            </div>

            <div className={s.formContent} >
                <div className={s.fields}>
                    <h3>Overview</h3>
                </div>

                <div className={s.fields}>
                    <TextField label='Project name' {...register('name')} error={errors.name} />
                    <TextField label='Subtitle' {...register('subtitle')} error={errors.subtitle} />
                </div>
                <div className={s.fields}>
                    <TextField label='Slug' {...register('slug')} error={errors.slug} readOnly={Boolean(initialValue)} disabled={Boolean(initialValue)} />
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
                    <ImageController name='logoDark' label='Logo Dark mode' />
                </div>
                <div className={s.fields}>
                    <ImageController name='previewImage' label='OG Preview' />
                </div>


                <Separator />

                <div className={s.fields}>
                    <h3>Project page</h3>
                    <TextField label='Project Index' {...register('projectIndex')} />
                </div>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Project description' area  {...register('projectDescription')} error={errors.projectDescription} />
                </div>

                <Links />
                <ProjectImages control={control} register={register} errors={errors} />

                <Separator />

                <div className={s.fields}>
                    <h3>Home page</h3>
                    <TextField label='Home Index' {...register('homeIndex')} />
                </div>

                <div className={s.areaContainer}>
                    <TextField className={s.area} label='Description' area  {...register('homeDescription')} error={errors.homeDescription} />
                </div>

                <div className={s.fields}>
                    <ImageController name='banner' label='Banner Photo' />
                </div>

            </div>
        </form>
    </FormProvider>
}

const Labels = () => {
    const { watch, control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'labels',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={index === 0 ? s.fields : s.labels}>
            <TextField label={index === 0 && 'Deliverable'} {...register(`labels.${index}.text`)} error={errors.labels?.[index]?.text} />
            <IconField label={index === 0 && 'Icon'} register={register} errors={errors} name={`labels.${index}`} watch={watch} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            text: '',
            variant: '',
            icon: ''
        })}>
            Add Deliverable
        </Button>
    </>
}


const Links = () => {
    const { watch, control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'links',
        control
    })

    return <>
        {fields.map((f, index) => <div key={f.id} className={index === 0 ? s.fields : s.links}>
            <TextField label={index === 0 && 'External URL'} {...register(`links.${index}.url`)} error={errors.links?.[index]?.url} />
            <TextField label={index === 0 && 'Text'} {...register(`links.${index}.text`)} error={errors.links?.[index]?.text} />
            <IconField label={index === 0 && 'Icon'} register={register} errors={errors} name={`links.${index}`} watch={watch} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
        <Button className={s.add} type='button' onClick={e => append({
            url: '',
            variant: '',
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
            <input className={s.urlInput} {...register(`images.${index}.url`)} />
            <TextField className={s.full} label={index === 0 && 'Alt text'} {...register(`images.${index}.alt`)} error={errors.images?.[index]?.alt} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
    </>
}

const IconField = ({ name, ...rest }) => {
    const { watch, register, formState: { errors } } = useFormContext()
    const value = watch(name)

    return <TextField {...register(name + '.icon')} error={get(errors, name)}
        start={
            <select className={s.variant} {...register(name + '.variant')}>
                <option value='far' label='Regular' />
                <option value='fal' label='Light' />
                <option value='fas' label='Solid' />
                <option value='fab' label='Brand' />
            </select>
        }
        end={
            <div className={s.faIcon}>
                <FontAwesomeIcon icon={[value.variant, value.icon]} />
            </div>
        }
        {...rest} />
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