import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useLogin = redirect => {
    const auth = getAuth()
    const router = useRouter()

    useEffect(() => {
        let url = '/admin/login'
        if (redirect)
            url += '?return=' + encodeURIComponent(redirect)

        if (!auth.currentUser)
            router.replace(url)
    }, [router, auth, redirect])

    return auth.currentUser
}