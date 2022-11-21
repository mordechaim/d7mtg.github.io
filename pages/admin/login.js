import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()
    const auth = getAuth()

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const route = router.query.return ?? '/admin'
                router.push(route)
            }
        })
    }, [router, auth])

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            if (result.user)
                setError(false)
        } catch (e) {
            setError(true)
        }
    }

    return <form onSubmit={handleLogin} className={error ? 'border-solid border-red-500' : undefined}>
        <input name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        <input type='submit' />
    </form>
}