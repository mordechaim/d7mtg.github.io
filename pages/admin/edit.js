import { useLogin } from 'utils/hooks';

export default function Edit(props) {
    const auth = useLogin('/admin/edit')

    if (auth)
        return 'Edit'
}