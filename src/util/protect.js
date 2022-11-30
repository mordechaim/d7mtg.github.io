import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export const protect = Component => {
    const ProtectedComponent = props => {
        const auth = getAuth()
        const [user, loading] = useAuthState(auth)
        const router = useRouter()

        useEffect(() => {
            if (!loading && !user)
                router.replace(`${process.env.NEXT_PUBLIC_LOGIN_URL}?return=${encodeURIComponent(router.asPath)}`)
        }, [user, loading, router])

        if (loading)
            return

        if (user)
            return <Component {...props} />
    }

    return ProtectedComponent
}