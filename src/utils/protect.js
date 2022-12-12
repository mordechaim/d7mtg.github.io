import { LoadingSpinner } from 'components'
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
                router.replace(`/admin/login?return=${encodeURIComponent(router.asPath)}`)
        }, [user, loading, router])

        if (user && !loading)
            return <Component {...props} />

        return <LoadingSpinner />
    }

    return ProtectedComponent
}