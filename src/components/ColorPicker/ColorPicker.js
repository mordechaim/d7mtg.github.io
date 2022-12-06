import { TextField } from 'components'
import { forwardRef, useEffect, useState } from 'react'
import s from './ColorPicker.module.scss'

export const ColorPicker = forwardRef(({ value, onChange, ...rest }, ref) => {
    const [textValue, setTextValue] = useState(value ?? '')
    const [localValue, setLocalValue] = useState(value ?? '')

    const handleColorInput = e => {
        const input = e.target.value
        onChange?.(input)
        setLocalValue(input)
        setTextValue(input)
    }
    const handleTextInput = e => {
        const input = e.target.value.replaceAll(/[^A-Fa-f0-9]/g, '')
        setTextValue('#' + input.substring(0, 6))

        if (input.length === 6) {
            onChange?.('#' + input)
            setLocalValue('#' + input)
        }
    }

    useEffect(() => {
        const input = value.replaceAll(/[^A-Fa-f0-9]/g, '')
        setTextValue('#' + input.substring(0, 6))
    }, [value])

    return <TextField ref={ref} onChange={handleTextInput} value={textValue?.substring(1)} {...rest}
        start={<span>#</span>}
        end={<input className={s.picker} type='color' value={value ?? localValue} onInput={handleColorInput} />}
    />
})