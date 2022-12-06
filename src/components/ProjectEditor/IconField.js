import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'clsx'
import { TextField } from 'components'
import { get, useFormContext, useWatch } from 'react-hook-form'
import s from './IconField.module.scss'

export const IconField = ({ name, className, ...rest }) => {
    const { register, formState: { errors } } = useFormContext()
    const value = useWatch({ name })

    return <TextField {...register(name + '.icon')} error={get(errors, name)}
        start={
            <select className={cx(s.variant, className)} {...register(name + '.variant',)}>
                <option value='far' label='Regular' />
                <option value='fal' label='Light' />
                <option value='fas' label='Solid' />
                <option value='fab' label='Brand' />
            </select>
        }
        end={<div className={s.faIcon}>
            {value?.variant && value?.icon && <FontAwesomeIcon icon={[value.variant, value.icon]} />}
        </div>}
        {...rest} />
}
