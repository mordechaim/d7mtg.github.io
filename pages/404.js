import { Fraunces } from '@next/font/google'
import { get, getDatabase, ref } from 'firebase/database'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import s from './404.module.scss'

const fraunces = Fraunces({
    subsets: ['latin'],
    fallback: ['serif'],
    weight: '500'
})

export default function NotFound({ links }) {
    const [typewriter, setTypewriter] = useState('\u00a0')

    useEffect(() => {
        const delay = setTimeout(() => {
            let i = 0
            const text = '404'

            const timer = setInterval(() => {
                if (i < text.length) {
                    setTypewriter(text.substring(0, i + 1))
                    i++
                }
                else
                    clearInterval(timer)
            }, 200)
        }, 1000)

        return () => clearTimeout(delay)
    }, [])

    const handleRandomUrl = e => {
        var i = Math.round(Math.random() * links.length)
        window.open(links[i], '_self')
    }

    return <div className={s.root} data-no-scroll>
        <Head>
            <title>404 Not Found</title>
        </Head>

        <div className={s.line} />

        <h2>{typewriter}</h2>
        <h1 className={fraunces.className}>Four, oh four.</h1>
        <p className={s.footer}>

            What are you looking for?
            <br /><br />
            Home page? <a href="https://d7m.tg/">Sure thing.</a><br />
            Random project from our portfolio? <span className={s.fakelink} onClick={handleRandomUrl}>Go right ahead</span><br />
            A way to contact us? <Link href="/contact?ref=fourohfour">Look no further.</Link>
        </p>
    </div>
}

export const getStaticProps = async () => {
    const db = getDatabase()
    const key = ref(db, 'projects')
    const projects = await get(key)

    const links = Object.values(projects.toJSON()).map(i => '/portfolio/' + i.slug)

    return {
        props: {
            links
        }
    }
}