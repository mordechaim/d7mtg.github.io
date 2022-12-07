import cx from 'clsx'
import s from './NumberField.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from 'components'
import { forwardRef, useRef } from 'react'
import compose from '@seznam/compose-react-refs'


export const NumberField = forwardRef(({ className, disabled, ...rest }, ref) => {
    const input = useRef()

    const fireEvent = () => {
        const evt = new InputEvent('input', {
            bubbles: true,
            cancelable: true,
        })
        input.current.dispatchEvent(evt)
    }

    const handleUp = e => {
        input.current.stepUp()
        fireEvent()
    }

    const handleDown = e => {
        input.current.stepDown()
        fireEvent()
    }

    return <TextField ref={compose(ref, input)}
        className={cx(s.root, className)}
        type='number'
        disabled={disabled}
        {...rest}
        start={
            <button className={cx(s.button, s.up)} onClick={handleUp} disabled={disabled} type='button'>
                <FontAwesomeIcon icon={['fal', 'arrow-up']} />
            </button>
        }
        end={
            <button className={cx(s.button, s.down)} onClick={handleDown} disabled={disabled} type='button'>
                <FontAwesomeIcon icon={['fal', 'arrow-down']} />
            </button>
        }
    />
})