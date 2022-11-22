import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    const auth = getAuth()

    const [signIn, user, loading, error] = useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (user) {
            const route = router.query.return ?? '/admin/edit'
            router.push(route)
        }
    }, [router, user])

    const handleLogin = async e => {
        e.preventDefault()
        signIn(email, password)
    }

    return <form onSubmit={handleLogin} className={error ? 'border-solid border-red-500' : undefined}>
        <input name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <input type='submit' />
    </form>
}