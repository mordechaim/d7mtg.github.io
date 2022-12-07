import { ImageUpload, TextField } from 'components'
import { get, useFormContext } from 'react-hook-form'
import cx from 'clsx'
import s from './ImageController.module.scss'
import cs from './common.module.scss'

export const ImageController = ({ name, className, ...rest }) => {
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

    return <div className={cx(s.column, className)}>
        <ImageUpload className={cx(cs.full, s.upload)} onUploadComplete={handleUploadImage} error={get(errors, name)} {...rest}>
            {value && <div className={cx(s.thumbnail, s.embedded)}>
                <a href={value.url} target='_blank'>
                    <img src={value.url} href={value.url} height={150} alt={value.alt} />
                </a>
            </div>}
        </ImageUpload>
        {value && <TextField className={cs.full} label='Alt text' {...register(`${name}.alt`)} error={get(errors, name + '.alt')} />}
    </div>
}