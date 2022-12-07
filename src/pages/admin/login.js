import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from 'components'
import { getAuth } from 'firebase/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import s from './login.module.scss'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    const auth = getAuth()

    const [signIn, user, loading, error] = useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (user) {
            const route = router.query.return ?? '/admin'
            router.push(route)
        }
    }, [router, user])

    const handleLogin = async e => {
        e.preventDefault()
        signIn(email.trim(), password)
    }

    return <div className={s.root}>
        <Head>
            <title>Admin | Log in</title>
        </Head>
        <form onSubmit={handleLogin} className={s.form}>
            <TextField error={error} name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <TextField error={error} name='password' placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <span>{error?.message}</span>
            <button type='submit'>
                <FontAwesomeIcon icon={['fal', 'sign-in']} />
                &nbsp;&nbsp;Log In
            </button>
        </form>
    </div>
}