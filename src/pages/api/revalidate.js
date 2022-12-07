export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send()

    // TODO
    const {
        home = true,
        portfolio = true,
        project,
        notFound = true
    } = req.body

    try {
        if (home)
            await res.revalidate('/')
        if (portfolio)
            await res.revalidate('/portfolio')
        if (project)
            await res.revalidate(process.env.NEXT_PUBLIC_PROJECT_URL_PREFIX + project)
        if (notFound)
            await res.revalidate('/404')

        res.status(200).json({ value: 'Revalidation success' })
    } catch {
        res.status(500).json({ error: 'An error was thrown while revalidating' })
    }
}
