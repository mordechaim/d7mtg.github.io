import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components'

export const RemoveButton = props => {
    return <Button type='button' variant='secondary' {...props}>
        <FontAwesomeIcon icon={['fal', 'trash']} />
    </Button>
}