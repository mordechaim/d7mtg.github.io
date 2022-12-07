import { ColorPicker } from 'components'
import { Controller } from 'react-hook-form'


export const ColorPickerController = ({ control, name, ...rest }) => {
    return <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => <ColorPicker {...field} error={error}  {...rest} />}
    />
}
