import { ImageUpload, TextField } from 'components'
import { useFieldArray, useFormContext } from 'react-hook-form'
import cx from 'clsx'
import s from './ImageController.module.scss'
import cs from './common.module.scss'
import { RemoveButton } from './RemoveButton'

export const ImageArrayController = ({ name, className, ...rest }) => {
    const { control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name,
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

    return <div className={cx(s.column, className)}>
        <ImageUpload className={cx(s.upload, className)} onUploadComplete={handleUploadImage} multiple {...rest} />
        {fields.map((f, index) => <div key={f.id} className={cx(cs.fields, cs.noWrap)}>
            <div className={s.thumbnail}>
                <a href={f.url} target='_blank'>
                    <img src={f.url} href={f.url} width={100} alt={f.alt} />
                </a>
            </div>
            <TextField className={cs.full} label={index === 0 && 'Alt text'} {...register(`${name}.${index}.alt`)} error={errors[name]?.[index]?.alt} />
            <RemoveButton onClick={e => remove(index)} />
        </div>)}
    </div>
}